import { iconSubsetOptions } from "./commands/icon-subset/data.js";
import { iconSubsetAction } from "./commands/icon-subset/action.js";
import { gifOptions } from "./commands/generate-icon-fonts/data.js";
import { cleanIconsOptions } from "./commands/clean-icons/data.js";
import { gifAction } from "./commands/generate-icon-fonts/action.js";
import { cleanIconAction } from "./commands/clean-icons/action.js";

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

export const ICON_SUBSET_COMMAND = "icon-subset";

export const commands: Command[] = [
  {
    name: ICON_SUBSET_COMMAND,
    description:
      "Creates new icon font (woff2) by passing a safelist/blocklist with icon literals. " +
      "Requires https://github.com/fonttools/fonttools to be installed.",
    options: iconSubsetOptions,
    action: iconSubsetAction,
  },
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
