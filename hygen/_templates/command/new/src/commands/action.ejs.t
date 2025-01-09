---
force: true
to: ../src/commands/<%= name %>/action.ts
---
import { <%= h.changeCase.pascal(name) %>ConfigType, <%= h.changeCase.camel(name) %>Options } from "./data";
import { startConfigProcess } from "../../utils/config-process";
import { <%= h.inflection.underscore(name) %>_COMMAND } from "../../data";
import { startInquirerProcess } from "../../utils/inquirer-process";
import { <%= h.changeCase.camel(name) %> } from "./index";

export const <%= h.changeCase.camel(name) %>Action = async (passedConfig: <%= h.changeCase.pascal(name) %>ConfigType) => {
  let config = await startConfigProcess(<%= h.inflection.underscore(name) %>_COMMAND, passedConfig);

  config = await startInquirerProcess<<%= h.changeCase.pascal(name) %>ConfigType>(
    config,
    <%= h.changeCase.camel(name) %>Options,
  );

  return await <%= h.changeCase.camel(name) %>(config);
};
