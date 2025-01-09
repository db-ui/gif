import { getProgram } from "./program";
import { programDescription, programName } from "./data";
import { markdownTable } from "markdown-table";
import { writeFileSync } from "node:fs";
import FSE from "fs-extra";

const docsDirectory = "./docs";

const getBooleanValue = (value: unknown): string => {
  if (String(value) === "true") {
    return "✅";
  } else if (String(value) === "false") {
    return "❌";
  }

  return String(value);
};

export const generateApiDocs = (name: string, programDescription: string) => {
  const mProgram = getProgram(name, programDescription);
  let result = `# API - ${mProgram.name()}\n\n`;
  result += `${mProgram.description()}\n\n`;

  for (const command of mProgram.commands
    .slice()
    .sort((a, b) => a.name().localeCompare(b.name()))) {
    result += `## ${command.name()}\n\n`;
    result += `${command.description()}\n\n`;
    const mTable: string[][] = [
      ["long", "short", "description", "required", "defaultValue"],
    ];
    for (const {
      description,
      required,
      short,
      long,
      defaultValue,
    } of command.options
      .slice()
      .sort((a, b) => (a.required === b.required ? 0 : a.required ? -1 : 1))) {
      mTable.push([
        `\`${long}\``,
        `\`${short}\``,
        description,
        `\`${getBooleanValue(required)}\``,
        defaultValue ? `\`${JSON.stringify(defaultValue)}\`` : "",
      ]);
    }
    result += `${markdownTable(mTable, { align: ["l", "c", "l", "c", "l"] })}\n\n`;
  }

  if (!FSE.existsSync(docsDirectory)) {
    FSE.mkdirSync(docsDirectory, { recursive: true });
  }

  writeFileSync(`${docsDirectory}/API.md`, result);
};

generateApiDocs(programName, programDescription);