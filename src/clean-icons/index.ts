import { GlobOptionsWithFileTypesFalse, globSync } from "glob";

import SVGFixer from "oslllo-svg-fixer";
import { error } from "console";

const cleanIcons = async (
  src: string,
  ignoreGlobs?: string[],
  traceResolution?: string,
  debug?: boolean,
) => {
  const paths = `${src}/**/*.svg`;
  const options: GlobOptionsWithFileTypesFalse = {};
  if (ignoreGlobs) {
    options.ignore = ignoreGlobs;
  }

  const globPaths = globSync(paths, options)
    .map((path) => path.replace(/\\/g, "/"))
    .map((path) => path.slice(0, Math.max(0, path.lastIndexOf("/"))))
    .filter((v, i, self) => i === self.indexOf(v));

  const promises: Promise<unknown>[] = globPaths.map(async (path) => {
    try {
      // eslint-disable-next-line no-await-in-loop,new-cap
      return await SVGFixer(path, path, {
        showProgressBar: debug,
        traceResolution: Number(traceResolution || "600"),
      }).fix();
    } catch (catchError) {
      error(path, catchError);
      return catchError;
    }
  });

  await Promise.all(promises);
};

export default cleanIcons;
