export type ProgrammOptionsType = {
  name: string;
  short?: string;
  long?: string;
  array?: boolean;
  required?: boolean;
  description?: string;
  defaultValue?: string | boolean | string[];
};

export type OptionsType = {
  fontName: string;
  src: string;
  cleanIgnoreVariants: string[];
  variants: string[];
  debug?: boolean;
  dryRun?: boolean;
  overwriteSources?: boolean;
  prefix?: string;
  withSizes?: boolean;
  ignoreGlobs?: string[];
};
