---
force: true
to: ../test/<%= name %>/simple.ts
---
import { describe, expect, test } from "vitest";
import { cleanIconAction } from "../../../src/commands/<%= name %>/action";

describe("<%= name %>", () => {
  test("check if it works", async () => {
    const result = await <%= h.changeCase.camel(name) %>Action({
      dry: true
    });
    expect(result).toBeTruthy();
  });
});

