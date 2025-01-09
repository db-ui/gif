---
force: true
to: ../src/commands/<%= name %>/index.ts
---
import { <%= h.changeCase.pascal(name) %>ConfigType } from "./data";

export const <%= h.changeCase.camel(name) %> = async (config: <%= h.changeCase.pascal(name) %>ConfigType) => {
    const { debug, dry } = config;
    // TODO: Add you logic here

    return false;
}