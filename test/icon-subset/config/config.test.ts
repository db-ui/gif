import fs from "node:fs";
import {describe, expect, test} from "vitest";
import { iconSubsetAction } from "../../../src/commands/icon-subset/action.js";

describe("icon-subset", () => {
  test("check if it works", async () => {
    const out = "./test/icon-subset/generated/config";
    await iconSubsetAction({
      config: "test/icon-subset/config/icon-subset.json",
    });
    const changedFile = fs
        .readFileSync(`${out}/test.tmp.ttx`)
        .toString("utf-8");
    expect(changedFile).not.toContain("brand");
    const originFile = fs
        .readFileSync(`${out}/test.tmp-origin.ttx`)
        .toString("utf-8");
    expect(originFile).toContain("brand");
  });
});
