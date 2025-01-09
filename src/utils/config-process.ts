import { cosmiconfig, CosmiconfigResult } from "cosmiconfig";

export const startConfigProcess = async <T>(
  moduleName: string,
  config: T,
): Promise<T> => {
  const explorerSync = cosmiconfig(moduleName, {
    searchPlaces: [
      "package.json",
      `.${moduleName}rc`,
      `.${moduleName}rc.json`,
      `.${moduleName}rc.yaml`,
      `.${moduleName}rc.yml`,
      `.${moduleName}rc.js`,
      `.${moduleName}rc.ts`,
      `.${moduleName}rc.mjs`,
      `.${moduleName}rc.cjs`,
      `.config/${moduleName}rc`,
      `.config/${moduleName}rc.json`,
      `.config/${moduleName}rc.yaml`,
      `.config/${moduleName}rc.yml`,
      `.config/${moduleName}rc.js`,
      `.config/${moduleName}rc.ts`,
      `.config/${moduleName}rc.mjs`,
      `.config/${moduleName}rc.cjs`,
    ],
  });

  const configPath = config["config"];
  const configResult: CosmiconfigResult = await (configPath
    ? explorerSync.load(configPath)
    : explorerSync.search());

  if (configResult && !configResult.isEmpty) {
    return { ...config, ...configResult.config };
  }

  return config;
};
