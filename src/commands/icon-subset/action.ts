import { IconSubsetConfigType, iconSubsetOptions } from "./data";
import { startConfigProcess } from "../../utils/config-process";
import { ICON_SUBSET_COMMAND } from "../../data";
import { startInquirerProcess } from "../../utils/inquirer-process";
import { iconSubset } from "./index";

export const iconSubsetAction = async (passedConfig: IconSubsetConfigType) => {
  let config = await startConfigProcess(ICON_SUBSET_COMMAND, passedConfig);

  config = await startInquirerProcess<IconSubsetConfigType>(
    config,
    iconSubsetOptions,
  );

  return await iconSubset(config);
};
