import { describe, expect, test } from "@jest/globals";
import generateIconFonts from "../../src/generate-icon-fonts";
import fs from "fs";

const timeout = 10 * 60 * 1000;

describe("full", () => {
  test(
    "check if all works",
    async () => {
      await generateIconFonts({
        fontName: "test",
        src: `./test/advanced/`,
        ignoreGlobs: ["**/tmp/**"],
        debug: true,
        cleanIgnoreVariants: [],
        variants: ["filled", "inverted"],
        withSizes: true,
      });

      const infoJson = JSON.parse(
        fs.readFileSync(`./test/advanced/fonts/all/info.json`).toString("utf-8"),
      );
      expect(Object.keys(infoJson)).toHaveLength(196);
    },
    timeout,
  );
});
