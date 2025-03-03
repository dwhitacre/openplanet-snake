import { afterAll, beforeAll, expect, test } from "bun:test";
import {
  apikeyCreate,
  playerAdminCreate,
  playerCreate,
  playerPermissionsCreate,
  playerPermissionsDelete,
} from "./api";
import { faker } from "@faker-js/faker";
import { Pool } from "pg";

let pool: Pool;
let adminApiKey: string;

beforeAll(async () => {
  pool = new Pool({
    connectionString:
      "postgres://openplanetsnake:Passw0rd!@localhost:5432/openplanetsnake?pool_max_conns=10",
  });
  adminApiKey = await playerAdminCreate(pool);
});

afterAll(async () => {
  await pool.end();
});

test("returns 200", async () => {
  const response = await fetch("http://localhost:8081/me");
  expect(response.status).toEqual(200);

  const json = await response.json();
  expect(json.me).toBeUndefined();
});

test("returns 200 when bad apikey", async () => {
  const accountId = faker.string.uuid();
  await playerCreate({
    accountId,
    apikey: adminApiKey,
  });

  const apikey = faker.string.uuid();
  await apikeyCreate(pool, accountId, apikey);

  const response = await fetch(`http://localhost:8081/me?api-key=garbage`);
  expect(response.status).toEqual(200);

  const json = await response.json();
  expect(json.me).toBeUndefined();
});

test("returns 200 and me with query param", async () => {
  const accountId = faker.string.uuid();
  await playerCreate({
    accountId,
    apikey: adminApiKey,
  });

  const apikey = faker.string.uuid();
  await apikeyCreate(pool, accountId, apikey);

  const response = await fetch(`http://localhost:8081/me?api-key=${apikey}`);
  expect(response.status).toEqual(200);

  const json = await response.json();
  expect(json.me.accountId).toEqual(accountId);
  expect(json.me.permissions).toEqual(["view"]);
});

test("returns 200 and me with header", async () => {
  const accountId = faker.string.uuid();
  await playerCreate({
    accountId,
    apikey: adminApiKey,
  });

  const apikey = faker.string.uuid();
  await apikeyCreate(pool, accountId, apikey);

  const response = await fetch(`http://localhost:8081/me`, {
    headers: {
      "x-api-key": apikey,
    },
  });
  expect(response.status).toEqual(200);

  const json = await response.json();
  expect(json.me.accountId).toEqual(accountId);
  expect(json.me.permissions).toEqual(["view"]);
});

test("returns 200 and me with permissions", async () => {
  const accountId = faker.string.uuid();
  await playerCreate({
    accountId,
    apikey: adminApiKey,
  });

  const apikey = faker.string.uuid();
  await apikeyCreate(pool, accountId, apikey);

  const permissions = [
    "player:manage",
    "gamemode:manage",
    "leaderboard:manage",
    "apikey:manage",
    "admin",
  ];
  for (let i = 0; i < permissions.length; i++) {
    await playerPermissionsCreate(pool, accountId, permissions[i]);
  }

  const response = await fetch(`http://localhost:8081/me?api-key=${apikey}`);
  expect(response.status).toEqual(200);

  const json = await response.json();
  expect(json.me.accountId).toEqual(accountId);
  expect(json.me.permissions).toEqual([
    "view",
    "player:manage",
    "gamemode:manage",
    "leaderboard:manage",
    "apikey:manage",
    "admin",
  ]);
});

test("returns 200 and me with permissions after delete", async () => {
  const accountId = faker.string.uuid();
  await playerCreate({
    accountId,
    apikey: adminApiKey,
  });

  const apikey = faker.string.uuid();
  await apikeyCreate(pool, accountId, apikey);

  const permissions = [
    "player:manage",
    "gamemode:manage",
    "leaderboard:manage",
    "apikey:manage",
    "admin",
  ];
  for (let i = 0; i < permissions.length; i++) {
    await playerPermissionsCreate(pool, accountId, permissions[i]);
  }

  await fetch(`http://localhost:8081/me?api-key=${apikey}`);

  await playerPermissionsDelete(pool, accountId, "admin");

  const response = await fetch(`http://localhost:8081/me?api-key=${apikey}`);
  expect(response.status).toEqual(200);

  const json = await response.json();
  expect(json.me.accountId).toEqual(accountId);
  expect(json.me.permissions).toEqual([
    "view",
    "player:manage",
    "gamemode:manage",
    "leaderboard:manage",
    "apikey:manage",
  ]);
});
