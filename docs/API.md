# API - @db-ux/icon-font-tools

CLI for generating or manipulating icon fonts from SVG files.

## clean-icons

Clean svgs for icon fonts to work

| long                |   short  | description                                                                                         | required | defaultValue |
| :------------------ | :------: | :-------------------------------------------------------------------------------------------------- | :------: | :----------- |
| `--src`             |   `-s`   | Src folder with all svgs                                                                            |    `✅`   |              |
| `--traceResolution` |   `-t`   | Change the default resolution of the trace                                                          |    `❌`   | `"600"`      |
| `--out`             |   `-o`   | Relative path where the files should be written to. Empty string will overwrite the original files. |    `❌`   |              |
| `--dry`             |   `-d`   | Do a dry run with this command - prints/returns output                                              |    `❌`   |              |
| `--ignoreGlobs`     |   `-ig`  | Path icon glob to exclude from the fonts                                                            |    `❌`   | `[]`         |
| `--debug`           | `-debug` | Extra logging                                                                                       |    `❌`   |              |

## generate-icon-fonts

Generate icon fonts from SVG files

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

