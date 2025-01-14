import { describe, expect, test } from "vitest";
import { cleanIconAction } from "../../../src/commands/clean-icons/action.js";
import { readFileSync } from "node:fs";

const out = "./test/clean-icons/simple/generated";

describe("clean icons", () => {
  test("check if glob works", async () => {
    const paths = await cleanIconAction({
      dry: true,
      src: "./test/clean-icons/simple",
      ignore: ["**/ignore/**", "**/generated/**"],
    });
    expect(paths).toHaveLength(1);
  });

  test("check if clean icon is created", async () => {
    await cleanIconAction({
      src: "./test/clean-icons/simple",
      ignore: ["**/ignore/**"],
      out,
    });

    const testSvg = readFileSync(`${out}/arrow-down.svg`).toString();
    expect(testSvg).not.toContain('<path d="M12 5v14" />');
  });
});
