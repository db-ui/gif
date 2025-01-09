---
force: true
to: ../src/commands/<%= name %>/data.ts
---
import { ProgramOptionsType } from "../../data";
import {
  configOption,
  ConfigType,
  DebugConfigType,
  debugOption,
  DryConfigType,
  dryRunOption,
} from "../../utils/shared";

export type <%= h.changeCase.pascal(name) %>ConfigType = {
} & DryConfigType &
  DebugConfigType &
  ConfigType;

export const <%= h.changeCase.camel(name) %>Options: ProgramOptionsType[] = [
  dryRunOption,
  debugOption,
  configOption,
];




