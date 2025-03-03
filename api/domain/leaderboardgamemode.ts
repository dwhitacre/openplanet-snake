import Json from "./json";

export class LeaderboardGameMode {
  leaderboardId: string;
  gameModeId: string;
  dateModified?: Date;

  static fromJson(json: { [_: string]: any }): LeaderboardGameMode {
    json = Json.lowercaseKeys(json);

    if (!json.leaderboardid) throw new Error("Failed to get leaderboardId");
    if (!json.gamemodeid) throw new Error("Failed to get gameModeId");
    const gameModeScore = new LeaderboardGameMode(
      json.leaderboardid,
      json.gamemodeid
    );
    if (json.datemodified) gameModeScore.dateModified = json.datemodified;

    return gameModeScore;
  }

  constructor(leaderboardId: string, gameModeId: string) {
    this.leaderboardId = leaderboardId;
    this.gameModeId = gameModeId;
  }

  toJson() {
    return {
      leaderboardId: this.leaderboardId,
      gameModeId: this.gameModeId,
      dateModified: this.dateModified,
    };
  }
}

export default LeaderboardGameMode;
