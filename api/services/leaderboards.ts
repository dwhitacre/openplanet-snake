import type { Db } from "./db";
import Leaderboard from "../domain/leaderboard";

export class Leaderboards {
  db: Db;

  constructor(db: Db) {
    this.db = db;
  }

  async get(id: string) {
    const result = await this.db.pool.query(
      `
        select * from Leaderboards
        where Id=$1
      `,
      [id]
    );
    if (!result.rowCount || result.rowCount !== 1) return undefined;
    return Leaderboard.fromJson(result.rows[0]);
  }

  async getAll() {
    const result = await this.db.pool.query(
      `
        select * from Leaderboards
      `
    );
    if (!result?.rowCount) return [];
    return result.rows.map(Leaderboard.fromJson);
  }

  async insert(leaderboard: Leaderboard) {
    return this.db.pool.query(
      `
        insert into Leaderboards (Id, Name)
        values ($1, $2)
      `,
      [leaderboard.id, leaderboard.name]
    );
  }

  async update(leaderboard: Leaderboard) {
    return this.db.pool.query(
      `
        update Leaderboards
        set Name=$2, DateModified=now()
        where Id=$1
      `,
      [leaderboard.id, leaderboard.name]
    );
  }

  async upsert(leaderboard: Leaderboard): Promise<Leaderboard> {
    try {
      await this.insert(leaderboard);
    } catch (error) {
      const result = await this.update(leaderboard);
      if (result.rowCount == null || result.rowCount < 1) throw error;
    }
    return leaderboard;
  }
}

export default (db: Db) => new Leaderboards(db);
