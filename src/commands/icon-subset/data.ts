import { ProgramOptionsType } from "../../data";
import {
  configOption,
  ConfigType,
  DebugConfigType,
  debugOption,
  DryConfigType,
  dryRunOption,
  IgnoreGlobsConfigType,
  ignoreGlobsOption,
  OutConfigType,
  outOption,
  SrcConfigType,
} from "../../utils/shared";

export type IconSubsetFileMapping = {
  input: string;
  tmp: string;
  output: string;
};

export type IconSubsetConfigType = {
  filePaths?: string;
  blockList?: string[];
  safeList?: string[];
  overwrite?: boolean;
} & DryConfigType &
  DebugConfigType &
  ConfigType &
  OutConfigType &
  SrcConfigType &
  IgnoreGlobsConfigType;

export const iconSubsetOptions: ProgramOptionsType[] = [
  {
    short: "l",
    name: "safeList",
    array: true,
    description:
      "Includes only icons from provided list. Priority over 'blockList'.",
  },
  {
    short: "b",
    name: "blockList",
    array: true,
    description:
      "Excludes all icons from provided list. Can't be used together with 'safeList'.",
  },
  {
    short: "w",
    name: "overwrite",
    defaultValue: true,
    description:
      "If the source file should be overwritten. Disables 'out' option.",
  },
  {
    short: "s",
    name: "src",
    description: "Src folder with all woff2 files",
  },
  {
    short: "f",
    name: "filePaths",
    description: "File paths to woff2 file which should be subsetted.",
  },
  outOption,
  dryRunOption,
  debugOption,
  configOption,
  ignoreGlobsOption,
];
