---
to: ../src/data.ts
inject: true
after: export const commands
---
  {
    name: <%= h.changeCase.constant(name) %>_COMMAND,
    description: "<%= description %>",
    options: <%= h.changeCase.camel(name) %>Options,
    action: <%= h.changeCase.camel(name) %>Action,
  },