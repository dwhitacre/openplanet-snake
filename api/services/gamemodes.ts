import type { Db } from "./db";
import GameMode from "../domain/gamemode";

export class GameModes {
  db: Db;

  constructor(db: Db) {
    this.db = db;
  }

  async get(id: string) {
    const result = await this.db.pool.query(
      `
        select * from GameModes
        where Id=$1
      `,
      [id]
    );
    if (!result.rowCount || result.rowCount !== 1) return undefined;
    return GameMode.fromJson(result.rows[0]);
  }

  async getAll() {
    const result = await this.db.pool.query(
      `
        select * from GameModes
      `
    );
    if (!result?.rowCount) return [];
    return result.rows.map(GameMode.fromJson);
  }

  async insert(gameMode: GameMode) {
    return this.db.pool.query(
      `
        insert into GameModes (Id, Name)
        values ($1, $2)
      `,
      [gameMode.id, gameMode.name]
    );
  }

  async update(gameMode: GameMode) {
    return this.db.pool.query(
      `
        update GameModes
        set Name=$2, DateModified=now()
        where Id=$1
      `,
      [gameMode.id, gameMode.name]
    );
  }

  async upsert(gameMode: GameMode): Promise<GameMode> {
    try {
      await this.insert(gameMode);
    } catch (error) {
      const result = await this.update(gameMode);
      if (result.rowCount == null || result.rowCount < 1) throw error;
    }
    return gameMode;
  }
}

export default (db: Db) => new GameModes(db);
