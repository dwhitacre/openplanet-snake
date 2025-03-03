import Json from "./json";

export class GameModeScore {
  accountId: string;
  gameModeId: string;
  score: number;
  dateModified?: Date;

  static fromJson(json: { [_: string]: any }): GameModeScore {
    json = Json.lowercaseKeys(json);

    if (!json.accountid) throw new Error("Failed to get accountId");
    if (!json.gamemodeid) throw new Error("Failed to get gameModeId");
    if (!json.score) throw new Error("Failed to get score");

    const gameModeScore = new GameModeScore(
      json.accountid,
      json.gamemodeid,
      json.score
    );
    if (json.datemodified) gameModeScore.dateModified = json.datemodified;

    return gameModeScore;
  }

  constructor(accountId: string, gameModeId: string, score: number) {
    this.accountId = accountId;
    this.gameModeId = gameModeId;
    this.score = score;
  }

  toJson() {
    return {
      accountId: this.accountId,
      gameModeId: this.gameModeId,
      score: this.score,
      dateModified: this.dateModified,
    };
  }
}

export default GameModeScore;
