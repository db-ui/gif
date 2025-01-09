---
force: true
to: ../test/<%= name %>/simple.test.ts
---
import { describe, expect, test } from "vitest";
import { <%= h.changeCase.camel(name) %>Action } from "../../src/commands/<%= name %>/action";

describe("<%= name %>", () => {
  test("check if it works", async () => {
    const result = await <%= h.changeCase.camel(name) %>Action({
      dry: true
    });
    expect(result).toBeTruthy();
  });
});