import { GifConfigType, gifOptions } from "./data.js";
import { startInquirerProcess } from "../../utils/inquirer-process.js";
import { startConfigProcess } from "../../utils/config-process.js";
import { GIF_COMMAND } from "../../data.js";
import { generateIconFonts } from "./index.js";

export const gifAction = async (gifConfig: GifConfigType): Promise<unknown> => {
  let config = await startConfigProcess(GIF_COMMAND, gifConfig);

  config = await startInquirerProcess<GifConfigType>(config, gifOptions);

  return generateIconFonts(config);
};
