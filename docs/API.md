# API - @db-ux/icon-font-tools

CLI for generating or manipulating icon fonts from SVG files.

## clean-icons

Clean svgs for icon fonts to work

> You can use `clean-icons.json` as a config file. 
  By default it tries to search for the configuration otherwise use a correct path by passing `--config=./clean-icons.json`.

| long                |   short  | description                                                                                         | required | defaultValue |
| :------------------ | :------: | :-------------------------------------------------------------------------------------------------- | :------: | :----------- |
| `--src`             |   `-s`   | Src folder with all svgs                                                                            |    `✅`   |              |
| `--traceResolution` |   `-t`   | Change the default resolution of the trace                                                          |    `❌`   | `"600"`      |
| `--out`             |   `-o`   | Relative path where the files should be written to. Empty string will overwrite the original files. |    `❌`   |              |
| `--dry`             |   `-d`   | Do a dry run with this command - prints/returns output                                              |    `❌`   |              |
| `--ignoreGlobs`     |   `-ig`  | Path icon glob to exclude from the fonts                                                            |    `❌`   | `[]`         |
| `--debug`           | `-debug` | Extra logging                                                                                       |    `❌`   |              |
| `--config`          |   `-c`   | Path to configuration file                                                                          |    `❌`   |              |

## generate-icon-fonts

Generate icon fonts from SVG files

> You can use `generate-icon-fonts.json` as a config file. 
  By default it tries to search for the configuration otherwise use a correct path by passing `--config=./generate-icon-fonts.json`.

| long                 |   short  | description                                                                           | required | defaultValue |
| :------------------- | :------: | :------------------------------------------------------------------------------------ | :------: | :----------- |
| `--fontName`         |   `-fn`  | The name of your font                                                                 |    `✅`   |              |
| `--src`              |   `-s`   | Src folder with all svgs                                                              |    `✅`   |              |
| `--variants`         |  `-var`  | Font variants e.g. solid, inverted, etc. We always add a "default" variant for icons. |    `❌`   | `[]`         |
| `--withSizes`        |   `-ws`  | Splits the font into different sizes                                                  |    `❌`   |              |
| `--prefix`           |   `-p`   | Prefix of icons to delete for icons                                                   |    `❌`   |              |
| `--overwriteSources` |  `-ows`  | Overwrite all svgs inside src directory                                               |    `❌`   |              |
| `--dry`              |   `-d`   | Do a dry run with this command - prints/returns output                                |    `❌`   |              |
| `--ignoreGlobs`      |   `-ig`  | Path icon glob to exclude from the fonts                                              |    `❌`   | `[]`         |
| `--debug`            | `-debug` | Extra logging                                                                         |    `❌`   |              |
| `--config`           |   `-c`   | Path to configuration file                                                            |    `❌`   |              |

