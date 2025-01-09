import { gifOptions } from "./commands/generate-icon-fonts/data";
import { cleanIconsOptions } from "./commands/clean-icons/data";
import { gifAction } from "./commands/generate-icon-fonts/action";
import { cleanIconAction } from "./commands/clean-icons/action";

export const programName = "@db-ux/icon-font-tools";
export const programDescription =
  "CLI for generating or manipulating icon fonts from SVG files.";

export type Command = {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  action: (...args: any[]) => void | Promise<any>;
  description?: string;
  options?: ProgramOptionsType[];
};

export type ProgramOptionsType = {
  name: string;
  short?: string;
  long?: string;
  array?: boolean;
  required?: boolean;
  description?: string;
  defaultValue?: string | boolean | string[];
  inquirer?: {
    input?: { message: string };
  };
};

export const GIF_COMMAND = "generate-icon-fonts";
export const CI_COMMAND = "clean-icons";

export const commands: Command[] = [
  {
    name: GIF_COMMAND,
    description: "Generate icon fonts from SVG files",
    options: gifOptions,
    action: gifAction,
  },
  {
    name: CI_COMMAND,
    description: "Clean svgs for icon fonts to work",
    options: cleanIconsOptions,
    action: cleanIconAction,
  },
];
