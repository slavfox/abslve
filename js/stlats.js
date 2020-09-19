const stat_categories = {
  general: ["name", "stars"],
  baserunning: [
    "baserunningStars",
    "baseThirst",
    "continuation",
    "groundFriction",
    "indulgence",
    "laserlikeness",
  ],
  defense: [
    "defenseStars",
    "anticapitalism",
    "chasiness",
    "omniscience",
    "tenaciousness",
    "watchfulness",
  ],
  batting: [
    "battingStars",
    "buoyancy",
    "divinity",
    "martyrdom",
    "moxie",
    "musclitude",
    "patheticism",
    "thwackability",
    "tragicness",
    "battingSum",
  ],
  pitching: [
    "pitchingStars",
    "coldness",
    "overpowerment",
    "ruthlessness",
    "shakespearianism",
    "suppression",
    "unthwackability",
    "totalFingers",
    "pitchingSum",
  ],
  extra: ["cinnamon", "fate", "peanutAllergy", "pressurization", "soul"],
};

const abbrevs = {
  name: "Name",
  team: "Team",
  stars: "⭐",
  battingStars: "⭐",
  pitchingStars: "⭐",
  defenseStars: "⭐",
  baserunningStars: "⭐",
  pitchingSum: "🧮",
  battingSum: "🧮",
  anticapitalism: "anticap",
  baseThirst: "thrst",
  buoyancy: "float",
  chasiness: "chase",
  cinnamon: "cinnm",
  coldness: "cold",
  continuation: "cont",
  deceased: "dead",
  divinity: "divin",
  fate: "Fate",
  groundFriction: "fric",
  indulgence: "indlg",
  laserlikeness: "laser",
  martyrdom: "martyr",
  moxie: "moxie",
  musclitude: "muscl",
  omniscience: "omnisc",
  overpowerment: "op",
  patheticism: "pathtc",
  peanutAllergy: "allergy",
  pressurization: "prssr",
  ruthlessness: "ruth",
  shakespearianism: "ssper",
  soul: "soul",
  suppression: "supp",
  tenaciousness: "tenac",
  thwackability: "thwack",
  totalFingers: "fingers",
  tragicness: "tragic",
  unthwackability: "unthwk",
  watchfulness: "watch",
};

const url_prefix = "https://blaseballcors.herokuapp.com/";
const url = {
  players: url_prefix + "https://blaseball.com/database/players?ids=",
  teams: url_prefix + "https://blaseball.com/database/allTeams",
};

const mild_fk = "?forbidden-knowledge";
const wild_fk = "?foreboding-kaleidoscope";

const bad = "#FF9AA2";
const poor = "#FFB7B2";
const ok = "#FFDAC1";
const good = "#E2F0CB";
const great = "#B5EAD7";
const wow = "#C7CEEA";

const defaultColors = {
  0.2: bad,
  0.4: poor,
  0.6: ok,
  0.8: good,
  1.0: great,
  Infinity: wow,
};

const reverseColors = {
  0.1: wow,
  0.2: great,
  0.4: good,
  0.8: ok,
  1.0: poor,
  Infinity: bad,
};

const anomalyColors = {
  "-1.0": bad,
  "-0.5": poor,
  0.5: ok,
  1.0: good,
  3.0: great,
  Infinity: wow,
};

const stlatColors = {
  stars: defaultColors,
  battingStars: defaultColors,
  pitchingStars: defaultColors,
  baserunningStars: defaultColors,
  defenseStars: defaultColors,
  buoyancy: defaultColors,
  divinity: defaultColors,
  thirst: defaultColors,
  martyrdom: defaultColors,
  moxie: defaultColors,
  musclitude: defaultColors,
  patheticism: reverseColors,
  thwackability: defaultColors,
  coldness: defaultColors,
  overpowerment: defaultColors,
  ruthlessness: defaultColors,
  shakespearianism: defaultColors,
  suppression: defaultColors,
  unthwackability: defaultColors,
  totalFingers: {
    10: bad,
    11: "rgba(255, 255, 255, 0",
    15: good,
    Infinity: great,
  },
  baseThirst: defaultColors,
  continuation: defaultColors,
  groundFriction: defaultColors,
  indulgence: defaultColors,
  laserlikeness: defaultColors,
  anticapitalism: defaultColors,
  chasiness: defaultColors,
  omniscience: defaultColors,
  tenaciousness: defaultColors,
  watchfulness: defaultColors,
  tragicness: { 0.1: great, 0.11: "rgba(255, 255, 255, 0)", Infinity: bad },
  battingSum: anomalyColors,
  pitchingSum: anomalyColors,
};

function battingStars(player) {
  return (
    Math.pow(1 - player.tragicness, 0.01) *
    Math.pow(player.buoyancy, 0) *
    Math.pow(player.thwackability, 0.35) *
    Math.pow(player.moxie, 0.075) *
    Math.pow(player.divinity, 0.35) *
    Math.pow(player.musclitude, 0.075) *
    Math.pow(1 - player.patheticism, 0.05) *
    Math.pow(player.martyrdom, 0.02)
  );
}

function pitchingStars(player) {
  return (
    Math.pow(player.shakespearianism, 0.1) *
    Math.pow(player.suppression, 0) *
    Math.pow(player.unthwackability, 0.5) *
    Math.pow(player.coldness, 0.025) *
    Math.pow(player.overpowerment, 0.15) *
    Math.pow(player.ruthlessness, 0.4)
  );
}

function baserunningStars(player) {
  return (
    Math.pow(player.laserlikeness, 0.5) *
    Math.pow(player.continuation, 0.1) *
    Math.pow(player.baseThirst, 0.1) *
    Math.pow(player.indulgence, 0.1) *
    Math.pow(player.groundFriction, 0.1)
  );
}

function defenseStars(player) {
  return (
    Math.pow(player.omniscience, 0.2) *
    Math.pow(player.tenaciousness, 0.2) *
    Math.pow(player.watchfulness, 0.1) *
    Math.pow(player.anticapitalism, 0.1) *
    Math.pow(player.chasiness, 0.1)
  );
}

function bump_hitting(player, modifier) {
  player.buoyancy = Math.max(player.buoyancy + modifier, 0.1);
  player.divinity = Math.max(player.divinity + modifier, 0.1);
  player.martyrdom = Math.max(player.martyrdom + modifier, 0.1);
  player.moxie = Math.max(player.moxie + modifier, 0.1);
  player.musclitude = Math.max(player.musclitude + modifier, 0.1);
  player.patheticism = Math.max(player.patheticism - modifier, 0.1);
  player.thwackability = Math.max(player.thwackability + modifier, 0.1);
  player.tragicness = Math.max(player.tragicness - modifier, 0.1);
}

function bump_pitching(player, modifier) {
  player.coldness = Math.max(player.coldness + modifier, 0.1);
  player.overpowerment = Math.max(player.overpowerment + modifier, 0.1);
  player.ruthlessness = Math.max(player.ruthlessness + modifier, 0.1);
  player.shakespearianism = Math.max(player.shakespearianism + modifier, 0.1);
  player.suppression = Math.max(player.suppression + modifier, 0.1);
  player.unthwackability = Math.max(player.unthwackability + modifier, 0.1);
}

function bump_baserunning(player, modifier) {
  player.thirst = Math.max(player.thirst + modifier, 0.1);
  player.continuation = Math.max(player.continuation + modifier, 0.1);
  player.friction = Math.max(player.friction + modifier, 0.1);
  player.indulgence = Math.max(player.indulgence + modifier, 0.1);
  player.laserlikeness = Math.max(player.laserlikeness + modifier, 0.1);
}

async function fetchPlayers(ids, isBatter, team) {
  try {
    const response = await fetch(url.players + ids.join(","));
    const response_data = await response.json();
    var players = {};
    for (var player of response_data) {
      var new_player = {
        ...player,
        batter: isBatter,
        battingStars: battingStars(player),
        pitchingStars: pitchingStars(player),
        baserunningStars: baserunningStars(player),
        defenseStars: defenseStars(player),
        team: team,
      };

      new_player.stars = isBatter
        ? new_player.battingStars
        : new_player.pitchingStars;

      new_player.battingSum =
        (new_player.buoyancy +
          new_player.divinity +
          new_player.martyrdom +
          new_player.moxie +
          new_player.musclitude +
          (1 - new_player.patheticism) +
          new_player.thwackability +
          (1 - new_player.tragicness) -
          new_player.battingStars * 9) *
        new_player.battingStars;
      new_player.pitchingSum =
        new_player.coldness +
        new_player.overpowerment +
        new_player.ruthlessness +
        new_player.shakespearianism +
        new_player.suppression +
        new_player.unthwackability -
        new_player.pitchingStars * 6 * new_player.pitchingStars;

      players[player.id] = new_player;
    }
    return players;
  } catch (e) {
    console.warn("couldn't get players, error:", e);
  }
}
