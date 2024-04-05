import { describe, expect, test } from "@jest/globals";
import generateIconFonts from "../../src/generate-icon-fonts";
import fs from "fs";

const timeout = 10 * 60 * 1000;

const runDefaultTest = async (name: string) => {
  await generateIconFonts({
    fontName: "test",
    src: `./test/local/${name}`,
    ignoreGlobs: [],
    debug: false,
    cleanIgnoreVariants: [],
    withSizes: true,
    variants: ["filled", "inverted"],
    overwriteSources: true,
  });

  return JSON.parse(
    fs
      .readFileSync(`./test/local/${name}/fonts/all/info.json`)
      .toString("utf-8"),
  );
};

describe.skip("advanced", () => {
  test(
    "check if accessibility",
    async () => {
      const infoJson = await runDefaultTest("accessibility");
      expect(Object.keys(infoJson)).toHaveLength(56);
    },
    timeout,
  );

  test(
    "check if arrows",
    async () => {
      const infoJson = await runDefaultTest("arrows");
      expect(Object.keys(infoJson)).toHaveLength(136);
    },
    timeout,
  );

  test(
    "check if audio & video",
    async () => {
      const infoJson = await runDefaultTest("audio & video");
      expect(Object.keys(infoJson)).toHaveLength(217);
    },
    timeout,
  );

  test(
    "check if buildings",
    async () => {
      const infoJson = await runDefaultTest("buildings");
      expect(Object.keys(infoJson)).toHaveLength(38);
    },
    timeout,
  );

  test(
    "check if business & payment",
    async () => {
      const infoJson = await runDefaultTest("business & payment");
      expect(Object.keys(infoJson)).toHaveLength(176);
    },
    timeout,
  );

  test(
    "check if communication",
    async () => {
      const infoJson = await runDefaultTest("communication");
      expect(Object.keys(infoJson)).toHaveLength(77);
    },
    timeout,
  );

  test(
    "check if date & time",
    async () => {
      const infoJson = await runDefaultTest("date & time");
      expect(Object.keys(infoJson)).toHaveLength(39);
    },
    timeout,
  );

  test(
    "check if devices",
    async () => {
      const infoJson = await runDefaultTest("devices");
      expect(Object.keys(infoJson)).toHaveLength(70);
    },
    timeout,
  );

  test(
    "check if editing",
    async () => {
      const infoJson = await runDefaultTest("editing");
      expect(Object.keys(infoJson)).toHaveLength(80);
    },
    timeout,
  );

  test(
    "check if environment",
    async () => {
      const infoJson = await runDefaultTest("environment");
      expect(Object.keys(infoJson)).toHaveLength(85);
    },
    timeout,
  );

  test(
    "check if file",
    async () => {
      const infoJson = await runDefaultTest("file");
      expect(Object.keys(infoJson)).toHaveLength(109);
    },
    timeout,
  );

  test(
    "check if food",
    async () => {
      const infoJson = await runDefaultTest("food");
      expect(Object.keys(infoJson)).toHaveLength(39);
    },
    timeout,
  );

  test(
    "check if human",
    async () => {
      const infoJson = await runDefaultTest("human");
      expect(Object.keys(infoJson)).toHaveLength(127);
    },
    timeout,
  );

  test(
    "check if layout",
    async () => {
      const infoJson = await runDefaultTest("layout");
      expect(Object.keys(infoJson)).toHaveLength(86);
    },
    timeout,
  );

  test(
    "check if logos",
    async () => {
      const infoJson = await runDefaultTest("logos");
      expect(Object.keys(infoJson)).toHaveLength(40);
    },
    timeout,
  );

  test(
    "check if maps",
    async () => {
      const infoJson = await runDefaultTest("maps");
      expect(Object.keys(infoJson)).toHaveLength(156);
    },
    timeout,
  );

  test(
    "check if medical",
    async () => {
      const infoJson = await runDefaultTest("medical");
      expect(Object.keys(infoJson)).toHaveLength(23);
    },
    timeout,
  );

  test(
    "check if navigation",
    async () => {
      const infoJson = await runDefaultTest("navigation");
      expect(Object.keys(infoJson)).toHaveLength(72);
    },
    timeout,
  );

  test(
    "check if notification",
    async () => {
      const infoJson = await runDefaultTest("notification");
      expect(Object.keys(infoJson)).toHaveLength(120);
    },
    timeout,
  );

  test(
    "check if security",
    async () => {
      const infoJson = await runDefaultTest("security");
      expect(Object.keys(infoJson)).toHaveLength(240);
    },
    timeout,
  );

  test(
    "check if social",
    async () => {
      const infoJson = await runDefaultTest("social");
      expect(Object.keys(infoJson)).toHaveLength(104);
    },
    timeout,
  );

  test(
    "check if technology",
    async () => {
      const infoJson = await runDefaultTest("technology");
      expect(Object.keys(infoJson)).toHaveLength(94);
    },
    timeout,
  );

  test(
    "check if tooling",
    async () => {
      const infoJson = await runDefaultTest("tooling");
      expect(Object.keys(infoJson)).toHaveLength(8);
    },
    timeout,
  );

  test(
    "check if transportation",
    async () => {
      const infoJson = await runDefaultTest("transportation");
      expect(Object.keys(infoJson)).toHaveLength(240);
    },
    timeout,
  );
});

describe.skip("full", () => {
  test(
    "check if all works",
    async () => {
      await generateIconFonts({
        fontName: "db-ux",
        src: `./test/local/`,
        ignoreGlobs: ["**/tmp/**"],
        debug: true,
        cleanIgnoreVariants: [],
        variants: ["filled", "inverted"],
        withSizes: true,
      });

      const infoJson = JSON.parse(
        fs.readFileSync(`./test/local/fonts/all/info.json`).toString("utf-8"),
      );
      expect(Object.keys(infoJson)).toHaveLength(2250);
    },
    timeout,
  );
});
