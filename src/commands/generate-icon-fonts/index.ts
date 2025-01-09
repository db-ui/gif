import { GifConfigType, gifOptions } from "./data";
import { startInquirerProcess } from "../../utils/inquirer-process";
import generateIconFonts from "./utils";
import { startConfigProcess } from "../../utils/config-process";
import { GIF_COMMAND } from "../../data";

export const gifAction = async (gifConfig: GifConfigType): Promise<unknown> => {
  let config = await startConfigProcess(GIF_COMMAND, gifConfig);

  config = await startInquirerProcess<GifConfigType>(config, gifOptions);

  return generateIconFonts(config);
};
