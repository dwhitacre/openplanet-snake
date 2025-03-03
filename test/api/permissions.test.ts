import { afterAll, beforeAll, expect, test } from "bun:test";
import { Pool } from "pg";
import { playerCreate, playerWithPermissionCreate } from "./api";

let pool: Pool;

beforeAll(() => {
  pool = new Pool({
    connectionString:
      "postgres://openplanetsnake:Passw0rd!@localhost:5432/openplanetsnake?pool_max_conns=10",
  });
});

afterAll(async () => {
  await pool.end();
});

test("admin", async () => {
  const apikey = await playerWithPermissionCreate(pool, "admin");

  let response = await playerCreate({ apikey });
  expect(response.status).toBe(200);
});

test("apikey:manage", async () => {
  const apikey = await playerWithPermissionCreate(pool, "apikey:manage");

  let response = await playerCreate({ apikey });
  expect(response.status).toBe(401);
});

test("leaderboard:manage", async () => {
  const apikey = await playerWithPermissionCreate(pool, "leaderboard:manage");

  let response = await playerCreate({ apikey });
  expect(response.status).toBe(401);
});

test("gamemode:manage", async () => {
  const apikey = await playerWithPermissionCreate(pool, "gamemode:manage");

  let response = await playerCreate({ apikey });
  expect(response.status).toBe(401);
});

test("player:manage", async () => {
  const apikey = await playerWithPermissionCreate(pool, "player:manage");

  let response = await playerCreate({ apikey });
  expect(response.status).toBe(200);
});

test("view", async () => {
  const apikey = await playerWithPermissionCreate(pool, "view");

  let response = await playerCreate({ apikey });
  expect(response.status).toBe(401);
});

test("multiple - admin, view", async () => {
  const apikey = await playerWithPermissionCreate(pool, ["admin", "view"]);

  let response = await playerCreate({ apikey });
  expect(response.status).toBe(200);
});
