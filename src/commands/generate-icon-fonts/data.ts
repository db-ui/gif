import { ProgramOptionsType } from "../../data";
import {
  DebugConfigType,
  debugOption,
  DryConfigType,
  dryRunOption,
  IgnoreGlobsConfigType,
  ignoreGlobsOption,
  SrcConfigType,
  srcOption,
} from "../../utils/shared";
import { Config } from "svgo";
import { SVGIcons2SVGFontStreamOptions } from "svgicons2svgfont";

export type GifConfigType = {
  fontName: string;
  variants: string[];
  overwriteSources?: boolean;
  prefix?: string;
  withSizes?: boolean;
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
  svgicons2svgfont?: SVGIcons2SVGFontStreamOptions;
} & DryConfigType &
  SrcConfigType &
  IgnoreGlobsConfigType &
  DebugConfigType;

export const gifOptions: ProgramOptionsType[] = [
  {
    short: "var",
    name: "variants",
    description:
      'Font variants e.g. solid, inverted, etc. We always add a "default" variant for icons.',
    array: true,
    defaultValue: [],
  },
  {
    short: "ws",
    name: "withSizes",
    description: "Splits the font into different sizes",
    required: false,
  },
  {
    short: "p",
    name: "prefix",
    description: "Prefix of icons to delete for icons",
  },
  {
    short: "fn",
    name: "fontName",
    description: "The name of your font",
    required: true,
    inquirer: {
      input: { message: "What is the name of your font?" },
    },
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
  dryRunOption,
  srcOption,
  ignoreGlobsOption,
  debugOption,
];
