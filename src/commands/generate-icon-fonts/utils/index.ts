/* eslint-disable no-await-in-loop */

import FSE from "fs-extra";

import svgToFont from "./svg-to-font";
import gatherIcons from "./gather-icons";
import { log } from "console";
import { GifConfigType } from "../data";
import { debugLog } from "../../../utils";

const generateIconFonts = async (values: GifConfigType): Promise<unknown> => {
  const { src, dry, debug = false, overwriteSources = false } = values;
  const dist = `${src}/fonts`;
  const temporaryDirectory = `${src}/tmp`;

  if (dry) {
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
    const iconPaths = gatherIcons(temporaryDirectory, values);

    debugLog(debug, "---Start svg to font ---");
    const allTemporaryDirectories = FSE.readdirSync(temporaryDirectory);
    for (const directory of allTemporaryDirectories) {
      const subDist = `${dist}/${directory}`;
      const subTemporaryDir = `${temporaryDirectory}/${directory}`;
      debugLog(debug, `svgToFont for ${subTemporaryDir}`);
      await svgToFont(subTemporaryDir, subDist, values);

      FSE.removeSync(`${subDist}/symbol.html`);
      FSE.removeSync(`${subDist}/unicode.html`);
    }

    if (overwriteSources && iconPaths) {
      const tempAllDir = `${temporaryDirectory}/all`;
      iconPaths.forEach((svgPath) => {
        const paths = svgPath.split("/");
        const filename: string = paths.at(-1) || "";
        const tmpFile = `${tempAllDir}/${filename}`;
        if (FSE.existsSync(`${tempAllDir}/${filename}`)) {
          FSE.copySync(tmpFile, svgPath, {
            overwrite: true,
          });
        }
      });
    }

    if (!debug) {
      FSE.removeSync(temporaryDirectory);
    }
  }

  return true;
};

export default generateIconFonts;
