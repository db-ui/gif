import { describe, expect, test } from "vitest";
import generateIconFonts from "../../src/generate-icon-fonts";
import fs from "fs";

describe("simple", () => {
  test("check if glob works", async () => {
    const paths = await generateIconFonts({
      fontName: "test",
      dryRun: true,
      src: "./test/simple",
      ignoreGlobs: ["**/ignore/**", "**/tmp/**"],
      cleanIgnoreVariants: ["test"],
      variants: ["test"],
    });
    expect(paths).toHaveLength(1);
  });

  test("check if fonts created", async () => {
    await generateIconFonts({
      fontName: "test",
      src: "./test/simple",
      ignoreGlobs: ["**/ignore/**", "**/tmp/**"],
      cleanIgnoreVariants: [],
      variants: []
    });

    const infoJson = JSON.parse(
      fs.readFileSync("./test/simple/fonts/all/info.json").toString("utf-8"),
    );
    expect(infoJson.db.unicode).toBe("&#100;&amp;#98;");
  });
});
