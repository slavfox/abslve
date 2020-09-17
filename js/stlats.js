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

const mild_fk = "#forbidden-knowledge";
const wild_fk = "#foreboding-kaleidoscope";

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

      players[player.id] = new_player;
    }
    return players;
  } catch (e) {
    console.warn("couldn't get players, error:", e);
  }
}
