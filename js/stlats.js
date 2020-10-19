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

const url_prefix = "https://cors-proxy.blaseball-reference.com/";
const url = {
  players: url_prefix + "database/players?ids=",
  teams: url_prefix + "database/allTeams",
  tribute: url_prefix + "api/getTribute",
};

const mild_fk = "?forbidden-knowledge";
const wild_fk = "?foreboding-kaleidoscope";

const colorSets = {
  Default: {
    bad: [255, 72, 87, 0.8],
    poor: [255, 102, 91, 0.6],
    ok: [255, 218, 193, 0.8],
    good: [226, 240, 203, 0.25],
    great: [152, 238, 157, 0.5],
    wow: [116, 216, 180, 0.8],
    none: [255, 255, 255, 0.0],
  },
  Moon: {
    bad: [201, 137, 80, 0.8],
    poor: [221, 169, 122, 0.6],
    ok: [238, 202, 166, 0.3],
    good: [213, 202, 235, 0.3],
    great: [194, 171, 226, 0.8],
    wow: [175, 140, 217, 1.0],
    none: [255, 255, 255, 0.0],
  },
  Gen1: {
    bad: [178, 24, 43, 0.6],
    poor: [239, 138, 98, 0.6],
    ok: [253, 219, 199, 0.7],
    good: [209, 229, 240, 0.2],
    great: [103, 169, 207, 0.6],
    wow: [33, 102, 172, 0.6],
    none: [255, 255, 255, 0.0],
  },
  Piccolo: {
    bad: [118, 42, 131, 0.5],
    poor: [175, 141, 195, 0.55],
    ok: [231, 212, 232, 0.5],
    good: [217, 240, 211, 0.6],
    great: [127, 191, 123, 0.6],
    wow: [27, 120, 55, 0.6],
    none: [255, 255, 255, 0.0],
  },
};

const colors = {
  bad: "bad",
  poor: "poor",
  ok: "ok",
  good: "good",
  great: "great",
  wow: "wow",
  none: "none",
};

const defaultColors = {
  0.125: colors.bad,
  0.35: colors.poor,
  0.45: colors.ok,
  0.75: colors.good,
  1.0: colors.great,
  Infinity: colors.wow,
};

const reverseColors = {
  0.1: colors.wow,
  0.2: colors.great,
  0.4: colors.good,
  0.8: colors.ok,
  1.0: colors.poor,
  Infinity: colors.bad,
};

const anomalyColors = {
  "-1.0": colors.bad,
  "-0.5": colors.poor,
  0.5: colors.ok,
  1.0: colors.good,
  3.0: colors.great,
  Infinity: colors.wow,
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
    10: colors.bad,
    11: colors.ok,
    13: colors.good,
    15: colors.great,
    Infinity: colors.wow,
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
  tragicness: { 0.1: colors.great, 0.11: colors.ok, Infinity: colors.bad },
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

function getBattingBaseStat(battingStars) {
  return Math.pow(battingStars, 0.92);
}

function getPitchingBaseStat(pitchingStars) {
  return 1.0262 * Math.pow(pitchingStars, 100 / 87);
}

async function fetchPlayers(ids, isBatter, team) {
  try {
    const response = await fetch(url.players + ids.join(","));
    const response_data = await response.json();
    var players = {};
    for (var player of response_data) {
      var newPlayer = {
        ...player,
        batter: isBatter,
        battingStars: battingStars(player),
        pitchingStars: pitchingStars(player),
        baserunningStars: baserunningStars(player),
        defenseStars: defenseStars(player),
        team: team,
      };

      newPlayer.stars = isBatter
        ? newPlayer.battingStars
        : newPlayer.pitchingStars;

      var battingBaseStat = getBattingBaseStat(newPlayer.battingStars);
      newPlayer.battingSum =
        newPlayer.buoyancy +
        newPlayer.divinity +
        newPlayer.moxie +
        newPlayer.musclitude -
        newPlayer.patheticism +
        newPlayer.thwackability +
        0.1 -
        (battingBaseStat * 5 + 0.1);

      var pitchingBaseStat = getPitchingBaseStat(newPlayer.pitchingStars);
      newPlayer.pitchingSum =
        newPlayer.coldness +
        newPlayer.overpowerment +
        newPlayer.ruthlessness +
        newPlayer.shakespearianism +
        newPlayer.suppression +
        newPlayer.unthwackability -
        pitchingBaseStat * 6;

      players[player.id] = newPlayer;
    }
    return players;
  } catch (e) {
    console.warn("couldn't get players, error:", e);
  }
}
