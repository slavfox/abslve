const categoryColors = {
  general: "#FF9AA2",
  batting: "#FFB7B2",
  pitching: "#FFDAC1",
  baserunning: "#E2F0CB",
  defense: "#B5EAD7",
  extra: "#C7CEEA",
};

const centerStats = ["name", "fate", "totalFingers", "peanutAllergy", "soul"];

const uncamel = (text) => {
  var result = text.replace(/([A-Z])/g, " $1");
  return result.charAt(0).toUpperCase() + result.slice(1);
};

const booleanify = (val) => {
  return val ? "⭕" : "❌";
};

const renderStars = (stars, fk) => {
  if (fk == "none") {
    var value = " ";
    var starcount = (stars * 10).toFixed(0) / 2;
    var fullstars = Math.floor(starcount);
    var halfstars = (starcount - fullstars) * 2;
    for (var i = 0; i < fullstars; i++) {
      value += "🌕 ";
    }
    for (var i = 0; i < Math.round(halfstars); i++) {
      value += "🌗 ";
    }
    for (var i = 0; i < Math.round(5 - (fullstars + halfstars)); i++) {
      value += "🌑 ";
    }
    return value;
  }
  return (stars * 10).toFixed(fk == "none" ? 0 : fk == "mild" ? 2 : 4) / 2;
};

const integerify = (n, fk) => {
  return n.toFixed(0);
};

const gameData = () => {
  return {
    teams: [],
    players: {},
    activeTeam: null,
    forbiddenKnowledge: "none",
    init() {
      this.teams = [];
      this.players = [];
      if (window.location.hash == mild_fk) {
        this.forbiddenKnowledge = "mild";
      } else if (window.location.hash == wild_fk) {
        this.forbiddenKnowledge = "wild";
      } else {
        this.forbiddenKnowledge = "none";
      }
      fetch(url.teams)
        .then((response) => response.json())
        .then((teams) => {
          this.teams.push(
            ...teams.sort((a, b) => (a.fullName > b.fullName ? 1 : -1))
          );
          for (const team of teams) {
            Promise.all([
              fetchPlayers([...team.lineup, ...team.bench], true, team),
              fetchPlayers([...team.rotation, ...team.bullpen], false, team),
            ]).then((values) => {
              for (var player_set of values) {
                this.players = { ...this.players, ...player_set };
              }
            });
          }
          this.activeTeam = this.teams[0];
        });
    },
    getPlayers(position) {
      var player_list = [];
      if (this.activeTeam === null) {
        for (team of this.teams) {
          for (id of team[position]) {
            if (id in this.players) {
              player_list.push(this.players[id]);
            }
          }
        }
      } else {
        for (id of this.activeTeam[position]) {
          if (id in this.players) {
            player_list.push(this.players[id]);
          }
        }
      }
      return player_list;
    },

    teamButtonStyle(team) {
      var r, g, b, mainColor, secondaryColor;
      if (team === null) {
        r = 222;
        g = 222;
        b = 222;
        mainColor = "rgb(222, 222, 222)";
        secondaryColor = "rgb(170, 170, 170)";
      } else {
        [r, g, b] = team.mainColor.match(/\w\w/g).map((x) => parseInt(x, 16));
        secondaryColor = team.secondaryColor;
      }
      if (this.activeTeam == team) {
        return `background-color: rgba(${r}, ${g}, ${b}, 0.75); border-color: ${secondaryColor}; color: #111`;
      } else {
        return `background-color: rgba(${r}, ${g}, ${b}, 0.33); color: #666; border-color: #666;`;
      }
    },

    stlatCategories() {
      var categories = {
        general: [],
        batting: [],
        pitching: [],
        baserunning: [],
        defense: [],
        extra: [],
      };
      if (this.forbiddenKnowledge == "none") {
        categories = {
          general: ["name", "stars"],
          batting: ["battingStars"],
          pitching: ["pitchingStars"],
          baserunning: ["baserunningStars"],
          defense: ["defenseStars"],
          extra: ["fate"],
        };
      } else {
        categories.general.push(...stat_categories.general);
        categories.batting.push(...stat_categories.batting);
        categories.pitching.push(...stat_categories.pitching);
        categories.baserunning.push(...stat_categories.baserunning);
        categories.defense.push(...stat_categories.defense);
        categories.extra.push(...stat_categories.extra);
      }
      if (this.activeTeam === null) {
        categories.general.splice(1, 0, "team");
      }
      return categories;
    },

    prettyStlats() {
      var result = [];
      for (const [category, stlats] of Object.entries(this.stlatCategories())) {
        for (stlat of stlats) {
          result.push({ name: stlat, color: categoryColors[category] });
        }
      }
      return result;
    },

    stlatFields() {
      return [].concat.apply([], Object.values(this.stlatCategories()));
    },

    fieldRenderers: {
      stars: renderStars,
      battingStars: renderStars,
      pitchingStars: renderStars,
      baserunningStars: renderStars,
      defenseStars: renderStars,
      fate: integerify,
      totalFingers: integerify,
      soul: integerify,
      peanutAllergy: booleanify,
      team: teamButtonLabel,
    },

    playerStlats(player) {
      const stlats = {};
      for (stlat of this.stlatFields()) {
        if (stlat === "name") {
          continue;
        }
        if (stlat in this.fieldRenderers) {
          stlats[stlat] = this.fieldRenderers[stlat](
            player[stlat],
            this.forbiddenKnowledge
          );
        } else {
          if (typeof player[stlat] == "number") {
            stlats[stlat] = player[stlat].toFixed(4);
          } else {
            stlats[stlat] = player[stlat];
          }
        }
      }
      return stlats;
    },

    activePlayerCategories() {
      var cats = ["lineup", "rotation"];
      if (this.forbiddenKnowledge == "wild") {
        return [...cats, "bench", "bullpen"];
      }
      return cats;
    },
  };
};

const teamEmoji = (team) => {
  if (team === null) {
    return "⚾";
  }
  return String.fromCodePoint(Number(team.emoji));
};

const teamButtonLabel = (team) => {
  return teamEmoji(team) + " " + (team ? team.shorthand : "All players");
};
