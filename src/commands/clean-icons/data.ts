import { ProgramOptionsType } from "../../data.js";
import {
  configOption,
  ConfigType,
  DebugConfigType,
  debugOption,
  DryConfigType,
  dryRunOption,
  IgnoreConfigType,
  ignoreOption,
  OutConfigType,
  SrcConfigType,
  srcOption,
} from "../../utils/shared.js";

export type CleanIconsConfigType = {
  traceResolution?: string;
} & DryConfigType &
  SrcConfigType &
  IgnoreConfigType &
  DebugConfigType &
  OutConfigType &
  ConfigType;

export const cleanIconsOptions: ProgramOptionsType[] = [
  {
    short: "r",
    name: "traceResolution",
    description: "Change the default resolution of the trace",
    defaultValue: "600",
  },
  {
    short: "o",
    name: "out",
    description:
      "Relative path where the files should be written to. Empty string will overwrite the original files.",
  },
  dryRunOption,
  srcOption,
  ignoreOption,
  debugOption,
  configOption,
];
