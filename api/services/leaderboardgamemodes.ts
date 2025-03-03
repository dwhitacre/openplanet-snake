import type { Db } from "./db";
import LeaderboardGameMode from "../domain/leaderboardgamemode";

export class LeaderboardGameModes {
  db: Db;

  constructor(db: Db) {
    this.db = db;
  }

  async get(leaderboardId: string, gameModeId: string) {
    const result = await this.db.pool.query(
      `
        select * from LeaderboardGameModes
        where LeaderboardId=$1 and GameModeId=$2
      `,
      [leaderboardId, gameModeId]
    );
    if (!result.rowCount || result.rowCount !== 1) return undefined;
    return LeaderboardGameMode.fromJson(result.rows[0]);
  }

  async getAll(leaderboardId: string) {
    const result = await this.db.pool.query(
      `
        select * from LeaderboardGameModes
        where LeaderboardId=$1
      `,
      [leaderboardId]
    );
    if (!result?.rowCount) return [];
    return result.rows.map(LeaderboardGameMode.fromJson);
  }

  async insert(leaderboardGameMode: LeaderboardGameMode) {
    return this.db.pool.query(
      `
        insert into LeaderboardGameModes (LeaderboardId, GameModeId)
        values ($1, $2)
      `,
      [leaderboardGameMode.leaderboardId, leaderboardGameMode.gameModeId]
    );
  }

  async update(leaderboardGameMode: LeaderboardGameMode) {
    return this.db.pool.query(
      `
        update LeaderboardGameModes
        set DateModified=now()
        where LeaderboardId=$1 and GameModeId=$2
      `,
      [leaderboardGameMode.leaderboardId, leaderboardGameMode.gameModeId]
    );
  }

  async delete(leaderboardGameMode: LeaderboardGameMode) {
    return this.db.pool.query(
      `
        delete from LeaderboardGameModes
        where LeaderboardId=$1 and GameModeId=$2
      `,
      [leaderboardGameMode.leaderboardId, leaderboardGameMode.gameModeId]
    );
  }

  async upsert(
    gameModeScore: LeaderboardGameMode
  ): Promise<LeaderboardGameMode> {
    try {
      await this.insert(gameModeScore);
    } catch (error) {
      const result = await this.update(gameModeScore);
      if (result.rowCount == null || result.rowCount < 1) throw error;
    }
    return gameModeScore;
  }
}

export default (db: Db) => new LeaderboardGameModes(db);
