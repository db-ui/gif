import { basename, dirname, extname } from "node:path";
import { existsSync } from "node:fs";
import { mkdirSync } from "node:fs";
import { IconSubsetConfigType, IconSubsetFileMapping } from "./data.js";
import { runTTX } from "./helpers/ttx.js";
import { filterIcons } from "./helpers/filter-icons.js";
import { glob } from "glob";

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
    ignore = [],
  } = config;

  if (!filePaths && !src) {
    throw Error(`Missing "filePath" or "src" option`);
  }

  try {
    // TODO: Shall we allow other file endings as well?
    const files = await glob(
      filePaths ? filePaths : src ? `${src.replace(/\/$/, "")}/**/*.woff2` : "",
      { ignore },
    );
    console.log(`Found ${files.length} files.`);
    const iconsFileMapping: IconSubsetFileMapping[] = files.map(
      (file) => {
        const cleanFile = file.replaceAll("\\", "/");
        const fileName = basename(cleanFile);
        const dir = dirname(cleanFile);
        const ext = extname(cleanFile);
        const tempFileName = fileName.replace(ext, ".tmp.ttx");
        const cleanOut = out ? out.replaceAll("\\", "/") : "";
        let outputFilePath = cleanFile;
        if (!overwrite) {
          outputFilePath = out
            ? `${cleanOut}/${fileName}`
            : `${dir}/${fileName.replace(".", "-subset.")}`;
        }

        return {
          input: cleanFile,
          tmp: out ? `${cleanOut}/${tempFileName}` : `${dir}/${tempFileName}`,
          output: outputFilePath,
        };
      },
    );

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
