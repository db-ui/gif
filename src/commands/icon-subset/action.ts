import { IconSubsetConfigType, iconSubsetOptions } from "./data.js";
import { startConfigProcess } from "../../utils/config-process.js";
import { ICON_SUBSET_COMMAND } from "../../data.js";
import { startInquirerProcess } from "../../utils/inquirer-process.js";
import { iconSubset } from "./index.js";

export const iconSubsetAction = async (passedConfig: IconSubsetConfigType) => {
  let config = await startConfigProcess(ICON_SUBSET_COMMAND, passedConfig);

  config = await startInquirerProcess<IconSubsetConfigType>(
    config,
    iconSubsetOptions,
  );

  return await iconSubset(config);
};
