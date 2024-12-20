import { ProgrammOptionsType } from "../types";

export const gifOptions: ProgrammOptionsType[] = [
  {
    name: "ignoreGlobs",
    description: "Path icon glob to exclude from the fonts",
    array: true,
  },
  {
    name: "variants",
    description:
      'Font variants e.g. solid, inverted, etc. We always add a "default" variant for icons.',
    array: true,
    defaultValue: [],
  },
  {
    name: "cleanIgnoreVariants",
    description: "Ignore variants which should not be cleaned automatically",
    array: true,
    defaultValue: [],
  },
  {
    name: "skipClean",
    description: "Skip cleaning process",
    defaultValue: false,
    short: "sc",
  },
  {
    name: "withSizes",
    description: "Splits the font into different sizes",
  },
  {
    name: "src",
    description: "Src folder with all svgs",
    required: true,
  },
  {
    name: "prefix",
    description: "Prefix of icons to delete for icons",
  },
  {
    name: "fontName",
    description: "The name of your font",
    required: true,
  },
  {
    name: "dryRun",
    short: "dry",
    description: "prints the output of the command",
  },
  {
    name: "debug",
    description: "Extra logging",
    defaultValue: false,
  },
  {
    name: "overwriteSources",
    short: "ows",
    description: "Overwrite all svgs inside src directory",
    defaultValue: false,
  },
  // TODO: This is buggy we should fix it by making a PR to https://github.com/jaywcjlove/svgtofont
  /*  {
    name: "outSVGReact",
    description: "Creates react svg components",
    short: "react",
    defaultValue: false,
  },*/
];
