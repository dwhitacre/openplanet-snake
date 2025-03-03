import type { Db } from "./db";
import GameModeScore from "../domain/gamemodescore";

export class GameModeScores {
  db: Db;

  constructor(db: Db) {
    this.db = db;
  }

  async get(accountId: string, gameModeId: string) {
    const result = await this.db.pool.query(
      `
        select * from GameModeScores
        where AccountId=$1 and GameModeId=$2
      `,
      [accountId, gameModeId]
    );
    if (!result.rowCount || result.rowCount !== 1) return undefined;
    return GameModeScore.fromJson(result.rows[0]);
  }

  async getAll(gameModeId: string) {
    const result = await this.db.pool.query(
      `
        select * from GameModeScores
        where GameModeId=$1
      `,
      [gameModeId]
    );
    if (!result?.rowCount) return [];
    return result.rows.map(GameModeScore.fromJson);
  }

  async insert(gameModeScore: GameModeScore) {
    return this.db.pool.query(
      `
        insert into GameModeScores (AccountId, GameModeId, Score)
        values ($1, $2, $3)
      `,
      [gameModeScore.accountId, gameModeScore.gameModeId, gameModeScore.score]
    );
  }

  async update(gameModeScore: GameModeScore) {
    return this.db.pool.query(
      `
        update GameModeScores
        set Score=$3, DateModified=now()
        where AccountId=$1 and GameModeId=$2
      `,
      [gameModeScore.accountId, gameModeScore.gameModeId, gameModeScore.score]
    );
  }

  async upsert(gameModeScore: GameModeScore): Promise<GameModeScore> {
    try {
      await this.insert(gameModeScore);
    } catch (error) {
      const result = await this.update(gameModeScore);
      if (result.rowCount == null || result.rowCount < 1) throw error;
    }
    return gameModeScore;
  }
}

export default (db: Db) => new GameModeScores(db);
