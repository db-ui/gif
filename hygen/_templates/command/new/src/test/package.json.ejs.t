---
to: ../test/package.json
inject: true
after: "scripts"
---
    "cli:<%= name %>:help": "tsx ../src/cli.ts <%= name %> --help",
    "cli:<%= name %>": "tsx ../src/cli.ts <%= name %> --dry",