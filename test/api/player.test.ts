import { afterAll, beforeAll, expect, test } from "bun:test";
import { faker } from "@faker-js/faker";
import { Pool } from "pg";
import {
  playerAdminCreate,
  playerCreate,
  playerGet,
  playerGetAll,
} from "./api";

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

test("get player dne", async () => {
  const response = await playerGet(pool, "000");
  expect(response.status).toEqual(400);
});

test("create player no adminkey", async () => {
  const response = await playerCreate({
    headers: {},
  });
  expect(response.status).toEqual(401);
});

test("create player bad method", async () => {
  const apikey = await playerAdminCreate(pool);
  const response = await playerCreate({ method: "DELETE", apikey });
  expect(response.status).toEqual(400);
});

test("create player bad body", async () => {
  const apikey = await playerAdminCreate(pool);
  const response = await playerCreate({
    body: faker.string.uuid(),
    apikey,
  });
  expect(response.status).toEqual(400);
});

test("create player no account id", async () => {
  const apikey = await playerAdminCreate(pool);
  const response = await playerCreate({
    body: {},
    apikey,
  });
  expect(response.status).toEqual(400);
});

test("create player no name", async () => {
  const apikey = await playerAdminCreate(pool);
  const response = await playerCreate({
    body: { accountId: faker.string.uuid() },
    apikey,
  });
  expect(response.status).toEqual(400);
});

test("create player", async () => {
  const apikey = await playerAdminCreate(pool);
  const accountId = faker.string.uuid();
  const name = faker.internet.username();
  const color = "3D0";
  const response = await playerCreate({
    accountId,
    name,
    color,
    apikey,
  });

  expect(response.status).toEqual(200);

  const playerResponse = await playerGet(pool, accountId);
  const json = await playerResponse.json();

  expect(json.player).toBeDefined();
  expect(json.player.accountId).toEqual(accountId);
  expect(json.player.name).toEqual(name);
  expect(json.player.color).toEqual(color);
  expect(json.player.displayName).toEqual("");
});

test("create player with optional", async () => {
  const apikey = await playerAdminCreate(pool);
  const accountId = faker.string.uuid();
  const name = faker.internet.username();
  const color = "3D0";
  const displayName = faker.internet.username();
  const response = await playerCreate({
    accountId,
    name,
    color,
    displayName,
    apikey,
  });

  expect(response.status).toEqual(200);

  const playerResponse = await playerGet(pool, accountId);
  const json = await playerResponse.json();

  expect(json.player).toBeDefined();
  expect(json.player.accountId).toEqual(accountId);
  expect(json.player.name).toEqual(name);
  expect(json.player.color).toEqual(color);
  expect(json.player.displayName).toEqual(displayName);
});

test("create player repeat is an update", async () => {
  const apikey = await playerAdminCreate(pool);
  const accountId = faker.string.uuid();
  const name = faker.internet.username();
  const response = await playerCreate({
    accountId,
    name,
    apikey,
  });

  expect(response.status).toEqual(200);

  const name2 = faker.internet.username();
  const response2 = await playerCreate({
    accountId,
    name: name2,
    apikey,
  });

  expect(response2.status).toEqual(200);

  const playerResponse = await playerGet(pool, accountId);
  const json = await playerResponse.json();

  expect(json.player).toBeDefined();
  expect(json.player.accountId).toEqual(accountId);
  expect(json.player.name).toEqual(name2);
});

test("get all", async () => {
  const apikey = await playerAdminCreate(pool);
  const accountId = faker.string.uuid();
  const name = faker.internet.username();
  const response = await playerCreate({
    accountId,
    name,
    apikey,
  });

  expect(response.status).toEqual(200);

  const playerResponse = await playerGetAll();
  const json = await playerResponse.json();

  expect(json.players).toBeDefined();
  expect(json.players.length).toBeGreaterThan(0);
});
