import db from "./db";
import logger from "./logger";
import players from "./players";
import gameModes from "./gamemodes";
import gameModeScores from "./gamemodescores";
import leaderboards from "./leaderboards";
import leaderboardGameModes from "./leaderboardgamemodes";

const services = {
  logger,
  db,
  players: players(db),
  gameModes: gameModes(db),
  gameModeScores: gameModeScores(db),
  leaderboards: leaderboards(db),
  leaderboardGameModes: leaderboardGameModes(db),
};

export type Services = typeof services;
export default services;
