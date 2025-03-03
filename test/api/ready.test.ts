import { expect, test } from "bun:test";

test("returns 200 on ready route", async () => {
  const response = await fetch("http://localhost:8081/ready");
  expect(response.status).toEqual(200);

  const json = await response.json();
  expect(json.status).toBe(200);
});
