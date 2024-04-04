/* eslint-disable no-await-in-loop */

import FSE from "fs-extra";

import { fileEndingsToDelete } from "./data";
import svgToFont from "./svg-to-font";
import cleanIcons from "../clean-icons";
import { OptionsType } from "../types";
import gatherIcons from "./gather-icons";
import { log } from "console";

const debugLog = (debug: boolean, message: string) => {
  if (debug) {
    log(message);
  }
};

const generateIconFonts = async (values: OptionsType): Promise<unknown> => {
  const {
    src,
    fontName,
    dryRun,
    cleanIgnoreVariants,
    debug = false,
    overwriteSources = false,
  } = values;
  const dist = `${src}/fonts`;
  const temporaryDirectory = `${src}/tmp`;
  const ignoreVariants = [...cleanIgnoreVariants].map(
    (igVar) => `**/${igVar}*/**`,
  );

  if (dryRun) {
    log("values:", values);
    return gatherIcons(temporaryDirectory, values);
  } else {
    if (FSE.existsSync(temporaryDirectory)) {
      FSE.removeSync(temporaryDirectory);
    }

    if (FSE.existsSync(dist)) {
      FSE.removeSync(dist);
    }

    debugLog(debug, "---Start gathering icon---");
    gatherIcons(temporaryDirectory, values);

    debugLog(debug, "---Start cleaning icon---");
    await cleanIcons(`${temporaryDirectory}/*`, ignoreVariants, debug);

    debugLog(debug, "---Start svg to font ---");
    const allTemporaryDirectories = FSE.readdirSync(temporaryDirectory);
    for (const directory of allTemporaryDirectories) {
      const subDist = `${dist}/${directory}`;
      const subTemporaryDir = `${temporaryDirectory}/${directory}`;
      debugLog(debug, `svgToFont for ${subTemporaryDir}`);
      await svgToFont(subTemporaryDir, subDist, values);
      for (const ending of fileEndingsToDelete) {
        FSE.removeSync(`${subDist}/${fontName}.${ending}`);
      }

      FSE.removeSync(`${subDist}/symbol.html`);
      FSE.removeSync(`${subDist}/unicode.html`);
    }

    if (overwriteSources) {
      FSE.copySync(`${temporaryDirectory}/all`, `${src}`, { overwrite: true });
    }

    if (!debug) {
      FSE.removeSync(temporaryDirectory);
    }
  }

  return true;
};

export default generateIconFonts;
