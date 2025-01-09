import { gifOptions } from "./commands/generate-icon-fonts/data";
import { gifAction } from "./commands/generate-icon-fonts";
import {cleanIconsOptions} from "./commands/clean-icons/data";
import {cleanIconAction} from "./commands/clean-icons";

export const programName = "@db-ui/icon-font-tools";
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

export const commands: Command[] = [
  {
    name: "generate-icon-fonts",
    description: "Generate icon fonts from SVG files",
    options: gifOptions,
    action: gifAction,
  },
  {
    name: "clean-icons",
    description: "Clean svgs for icon fonts to work",
    options: cleanIconsOptions,
    action: cleanIconAction,
  },
];
