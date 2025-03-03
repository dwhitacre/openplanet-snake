import { expect, test } from "bun:test";

test("returns 200 on config route", async () => {
  const response = await fetch("http://localhost:8081/config");
  expect(response.status).toEqual(200);

  const json = await response.json();

  expect(json.config).toEqual({
    healthCheckEnabled: true,
    healthCheckMs: 300000,
  });
});
