import { CleanIconsConfigType, cleanIconsOptions } from "./data.js";
import { startConfigProcess } from "../../utils/config-process.js";
import { CI_COMMAND } from "../../data.js";
import { startInquirerProcess } from "../../utils/inquirer-process.js";
import { cleanIcons } from "./index.js";

export const cleanIconAction = async (passedConfig: CleanIconsConfigType) => {
  let config = await startConfigProcess(CI_COMMAND, passedConfig);

  config = await startInquirerProcess<CleanIconsConfigType>(
    config,
    cleanIconsOptions,
  );

  return await cleanIcons(config);
};
