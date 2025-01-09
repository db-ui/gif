---
to: ../src/data.ts
prepend: true
---
import { <%= h.changeCase.camel(name) %>Options } from "./commands/<%= name %>/data";
import { <%= h.changeCase.camel(name) %>Action } from "./commands/<%= name %>/action";




