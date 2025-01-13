import { IconSubsetConfigType, IconSubsetFileMapping } from "./data";
import { runTTX } from "./helpers/ttx";
import { filterIcons } from "./helpers/filter-icons";
import { glob } from "glob";
import path from "node:path";
import { existsSync } from "node:fs";
import { mkdirSync } from "fs";

export const iconSubset = async (
  config: IconSubsetConfigType,
): Promise<boolean> => {
  const {
    debug,
    dry,
    filePaths,
    src,
    blockList,
    safeList,
    out,
    overwrite = true,
    ignoreGlobs = [],
  } = config;

  if (!filePaths && !src) {
    throw Error(`Missing "filePath" or "src" option`);
  }

  try {
    // TODO: Shall we allow other file endings as well?
    const files = await glob(
      filePaths ? filePaths : src ? `${src.replace(/\/$/, "")}/**/*.woff2` : "",
      { ignore: ignoreGlobs },
    );

    const iconsFileMapping: IconSubsetFileMapping[] = files.map((file) => {
      const cleanFile = file.replaceAll("\\", "/");
      const fileName = path.basename(cleanFile);
      const dirname = path.dirname(cleanFile);
      const extname = path.extname(cleanFile);
      const tempFileName = fileName.replace(extname, ".tmp.ttx");
      const cleanOut = out ? out.replaceAll("\\", "/") : "";
      let outputFilePath = cleanFile;
      if (!overwrite) {
        outputFilePath = out
          ? `${cleanOut}/${fileName}`
          : `${dirname}/${fileName.replace(".", "-subset.")}`;
      }

      return {
        input: cleanFile,
        tmp: out ? `${cleanOut}/${tempFileName}` : `${dirname}/${tempFileName}`,
        output: outputFilePath,
      };
    });

    if (dry) {
      console.log(iconsFileMapping, { blockList, safeList });
      return true;
    }

    if (out && !existsSync(out)) {
      mkdirSync(out, { recursive: true });
    }

    await runTTX({ compile: false, iconsFileMapping, debug });
    await filterIcons({ iconsFileMapping, safeList, blockList, debug });
    await runTTX({ iconsFileMapping, compile: true, debug });
  } catch (error) {
    console.error(error);
    return false;
  }

  return true;
};
