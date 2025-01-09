import { ProgramOptionsType } from "../data";

export type OutConfigType = {
  out?: string;
};

export type DryConfigType = {
  dry?: boolean;
};
export type DebugConfigType = {
  debug?: boolean;
};
export type SrcConfigType = {
  src?: string;
};

export type IgnoreGlobsConfigType = {
  ignoreGlobs?: string[];
};

export const dryRunOption: ProgramOptionsType = {
  name: "dry",
  description: "Do a dry run with this command - prints/returns output",
  defaultValue: false,
};

export const outOption: ProgramOptionsType = {
  name: "out",
  description: "Relative path where the file should be written",
  defaultValue: ".",
};

export const srcOption: ProgramOptionsType = {
  name: "src",
  description: "Src folder with all svgs",
  required: true,
  inquirer: {
    input: { message: "What is the source folder with all the svgs?" },
  },
};

export const ignoreGlobsOption: ProgramOptionsType = {
  short: "ig",
  name: "ignoreGlobs",
  description: "Path icon glob to exclude from the fonts",
  array: true,
  defaultValue: [],
};

export const debugOption: ProgramOptionsType = {
  short: "debug",
  name: "debug",
  description: "Extra logging",
  defaultValue: false,
};
