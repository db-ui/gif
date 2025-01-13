import { describe, expect, test } from "vitest";
import { iconSubsetAction } from "../../../src/commands/icon-subset/action";
import fs from "fs";

describe("icon-subset", () => {
  test("check if glob works", async () => {
    const result = await iconSubsetAction({
      dry: true,
      src: "./test/icon-subset",
    });
    expect(result).toBeTruthy();
  });

  test("check if it works", async () => {
    const out = "./test/icon-subset/generated/simple";
    await iconSubsetAction({
      src: "./test/icon-subset",
      out,
      blockList: ["brand"],
      ignoreGlobs: ["**/generated/**"],
      overwrite: false,
      debug: true,
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
