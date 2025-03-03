import type { Db } from "./db";
import { Player } from "../domain/player";

export class Players {
  db: Db;

  constructor(db: Db) {
    this.db = db;
  }

  async get(accountId: string) {
    const result = await this.db.pool.query(
      `
        select * from Players
        where AccountId=$1
      `,
      [accountId]
    );
    if (!result.rowCount || result.rowCount !== 1) return undefined;
    return Player.fromJson(result.rows[0]);
  }

  async getAll() {
    const result = await this.db.pool.query(
      `
        select * from Players
      `
    );
    if (!result?.rowCount) return [];
    return result.rows.map(Player.fromJson);
  }

  async getByApiKey(apikey?: string) {
    if (!apikey) return undefined;

    const result = await this.db.pool.query(
      `
        select p.AccountId, p.Name, p.Color, p.DateModified, p.DisplayName, perm.Name as Permission
        from Players p
        left join PlayerPermissions pp on p.AccountId = pp.AccountId
        left join Permissions perm on perm.Id = pp.PermissionId
        join ApiKeys a on a.AccountId = p.AccountId
        where Key = $1
      `,
      [apikey]
    );
    if (!result.rowCount || result.rowCount < 1) return undefined;
    return Player.fromJson(result.rows[0]).hydratePermissions(
      result.rows.map((row) => row.permission)
    );
  }

  async insert(player: Player) {
    return this.db.pool.query(
      `
        insert into Players (AccountId, Name, Color, DisplayName)
        values ($1, $2, $3, $4)
      `,
      [player.accountId, player.name, player.color, player.displayName]
    );
  }

  async update(player: Player) {
    return this.db.pool.query(
      `
        update Players
        set Name=$2, Color=$3, DisplayName=$4, DateModified=now()
        where AccountId=$1
      `,
      [player.accountId, player.name, player.color, player.displayName]
    );
  }

  async upsert(player: Player): Promise<Player> {
    try {
      await this.insert(player);
    } catch (error) {
      const result = await this.update(player);
      if (result.rowCount == null || result.rowCount < 1) throw error;
    }
    return player;
  }
}

export default (db: Db) => new Players(db);
