---
to: ../src/data.ts
inject: true
before: export const commands
---
export const <%= h.inflection.underscore(name) %>_COMMAND = "<%= name %>";





