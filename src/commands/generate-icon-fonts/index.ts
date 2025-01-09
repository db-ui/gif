import { GifConfigType, gifOptions } from "./data";
import { startInquirerProcess } from "../../utils/inquirer-process";
import generateIconFonts from "./utils";

export const gifAction = async (gifConfig: GifConfigType): Promise<unknown> => {
  const config = await startInquirerProcess<GifConfigType>(
    gifConfig,
    gifOptions,
  );

  return generateIconFonts(config);
};
