import { Pool } from "pg";

export class Db {
  pool: Pool;

  constructor() {
    this.pool = new Pool({
      connectionString: process.env.DATABASE_CONNSTR,
      ssl: process.env.DATABASE_SSL ? { rejectUnauthorized: false } : undefined,
    });
  }

  close() {
    return this.pool.end();
  }
}

export default new Db();
