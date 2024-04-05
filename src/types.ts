import { Config } from "svgo";
import { SvgIcons2FontOptions } from "svgicons2svgfont";

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
  traceResolution?: string;
  /**
   * https://github.com/svg/svgo#configuration
   */
  svgoOptions?: Config;
  /**
   * Creates svg react components
   */
  outSVGReact?: boolean;

  /**
   * This is the setting for [svgicons2svgfont](https://github.com/nfroidure/svgicons2svgfont/tree/dd713bea4f97afa59f7dba6a21ff7f22db565bcf#api)
   */
  svgicons2svgfont?: SvgIcons2FontOptions;
};
