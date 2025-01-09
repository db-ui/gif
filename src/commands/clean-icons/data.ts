import { ProgramOptionsType } from "../../data";
import {
  DebugConfigType,
  debugOption,
  DryConfigType,
  dryRunOption,
  IgnoreGlobsConfigType,
  ignoreGlobsOption,
  OutConfigType,
  SrcConfigType,
  srcOption,
} from "../../utils/shared";

export type CleanIconsConfigType = {
  traceResolution?: string;
} & DryConfigType &
  SrcConfigType &
  IgnoreGlobsConfigType &
  DebugConfigType &
  OutConfigType;

export const cleanIconsOptions: ProgramOptionsType[] = [
  {
    name: "traceResolution",
    description: "Change the default resolution of the trace",
    defaultValue: "600",
  },
  {
    name: "out",
    description:
      "Relative path where the files should be written to. Empty string will overwrite the original files.",
  },
  dryRunOption,
  srcOption,
  ignoreGlobsOption,
  debugOption,
];
