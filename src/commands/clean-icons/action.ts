import { CleanIconsConfigType, cleanIconsOptions } from "./data";
import { startConfigProcess } from "../../utils/config-process";
import { CI_COMMAND } from "../../data";
import { startInquirerProcess } from "../../utils/inquirer-process";
import { cleanIcons } from "./index";

export const cleanIconAction = async (passedConfig: CleanIconsConfigType) => {
  let config = await startConfigProcess(CI_COMMAND, passedConfig);

  config = await startInquirerProcess<CleanIconsConfigType>(
    config,
    cleanIconsOptions,
  );

  return await cleanIcons(config);
};
