---
to: ../src/data.ts
inject: true
before: export const commands
---
export const <%= h.changeCase.constant(name) %>_COMMAND = "<%= name %>";
