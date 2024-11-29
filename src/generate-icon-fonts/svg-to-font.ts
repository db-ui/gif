import { fileURLToPath } from "node:url";
import path from "node:path";

import svgtofont from "svgtofont";
import { OptionsType } from "../types.js";
import { log } from "console";

const svgToFont = async (
  temporaryDirectory: string,
  dist: string,
  options: OptionsType,
) => {
  const { fontName, debug, svgoOptions, outSVGReact, svgicons2svgfont } =
    options;
  const fileName = fileURLToPath(import.meta.url);
  let lastSlashIndex = fileName.lastIndexOf("\\");
  if (lastSlashIndex === -1) {
    lastSlashIndex = fileName.lastIndexOf("/");
  }

  let generateIconFontsDir = fileName.slice(0, Math.max(0, lastSlashIndex));

  if (generateIconFontsDir.endsWith("generate-icon-fonts")) {
    generateIconFontsDir = generateIconFontsDir.replace(
      "generate-icon-fonts",
      "",
    );
  }

  try {
    return svgtofont({
      src: temporaryDirectory,
      dist,
      fontName,
      log: debug,
      logger: (message) => log(message),
      css: true,
      outSVGReact,
      outSVGPath: true,
      useNameAsUnicode: true,
      generateInfoData: true,
      svgoOptions,
      svgicons2svgfont: {
        fontHeight: 1000,
        normalize: true,
        centerHorizontally: true,
        ...svgicons2svgfont,
      },
      website: {
        index: "font-class",
        template: path.resolve(generateIconFontsDir, "templates/index.njk"),
        links: [{ title: "", url: "" }],
      },
      styleTemplates: path.resolve(generateIconFontsDir, "styles"),
    });
  } catch (error) {
    console.error(error);
  }

  return true;
};

export default svgToFont;
