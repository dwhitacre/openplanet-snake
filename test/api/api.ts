import { faker } from "@faker-js/faker";
import type { Pool } from "pg";

export const playerGet = (_: Pool, accountId: string) => {
  return fetch(`http://localhost:8081/players?accountId=${accountId}`);
};

export const playerGetAll = () => {
  return fetch(`http://localhost:8081/players`);
};

export const playerCreate = ({
  accountId = faker.string.uuid(),
  name = faker.internet.username(),
  color = "3F3",
  displayName,
  body,
  method = "POST",
  headers = {
    "x-api-key": "developer-test-key",
  },
  apikey,
}: {
  accountId?: string;
  name?: string;
  color?: string;
  displayName?: string;
  body?: any;
  method?: string;
  headers?: any;
  apikey?: string;
} = {}) => {
  return fetch("http://localhost:8081/players", {
    body: JSON.stringify(body ?? { accountId, name, color, displayName }),
    method,
    headers: apikey ? { "x-api-key": apikey } : headers,
  });
};

export const apikeyCreate = (
  pool: Pool,
  accountId: string,
  apikey = faker.string.uuid()
) => {
  return pool.query(
    `
      insert into ApiKeys(AccountId, Key)
      values ($1, $2)
    `,
    [accountId, apikey]
  );
};

export const playerPermissionsCreate = async (
  pool: Pool,
  accountId: string,
  permissionName: string
) => {
  const result = await pool.query(
    `
      select Id
      from Permissions
      where Name = $1
    `,
    [permissionName]
  );

  return pool.query(
    `
      insert into PlayerPermissions(AccountId, PermissionId)
      values ($1, $2)
    `,
    [accountId, result.rows[0].id]
  );
};

export const playerPermissionsDelete = async (
  pool: Pool,
  accountId: string,
  permissionName: string
) => {
  const result = await pool.query(
    `
      select Id
      from Permissions
      where Name = $1
    `,
    [permissionName]
  );

  return pool.query(
    `
      delete from PlayerPermissions
      where AccountId = $1 and PermissionId = $2
    `,
    [accountId, result.rows[0].id]
  );
};

export const playerWithPermissionCreate = async (
  pool: Pool,
  permission: Array<string> | string,
  accountId: string = faker.string.uuid()
) => {
  permission = permission instanceof Array ? permission : [permission];

  await pool.query(
    `
      insert into Players(AccountId, Name)
      values ($1, $2)
    `,
    [accountId, faker.internet.username()]
  );

  for (let i = 0; i < permission.length; i++) {
    await playerPermissionsCreate(pool, accountId, permission[i]);
  }

  const apikey = faker.string.uuid();
  await apikeyCreate(pool, accountId, apikey);

  return apikey;
};

export const playerAdminCreate = async (
  pool: Pool,
  accountId: string = faker.string.uuid()
) => playerWithPermissionCreate(pool, "admin", accountId);
