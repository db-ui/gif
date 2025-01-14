/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from "node:fs/promises";

import * as xml2js from "xml2js";
import { IconSubsetFileMapping } from "../data";
import { debugLog } from "../../../utils";

const shouldInclude = (
  name: string,
  internalGlyphs: string[],
  safeList?: string[],
  blockList?: string[],
): boolean => {
  if (internalGlyphs.find((ig) => ig === name)) {
    return true;
  }

  if (safeList && safeList?.length > 0) {
    return !!safeList.find((sl) => sl === name);
  } else if (blockList && blockList?.length > 0) {
    return !blockList.find((bl) => bl === name);
  }

  return true;
};

export const filterIcons = async ({
  iconsFileMapping,
  safeList,
  blockList,
  debug,
}: {
  iconsFileMapping: IconSubsetFileMapping[];
  blockList?: string[];
  safeList?: string[];
  debug?: boolean;
}) => {
  for (const { tmp } of iconsFileMapping) {
    try {
      const data = await fs.readFile(tmp, "utf8");
      const builder = new xml2js.Builder();
      const result = await xml2js.parseStringPromise(data);

      if (debug) {
        await fs.writeFile(
          tmp.replace("tmp", "tmp-origin"),
          builder.buildObject(result),
        );
      }

      if (result?.ttFont) {
        const cmap = result.ttFont.cmap?.[0];
        let internalGlyphs: string[] = [];
        if (cmap?.cmap_format_4?.length > 0) {
          internalGlyphs = cmap.cmap_format_4[0]["map"].map(
            (entry: any) => entry.$.name,
          );
        }

        const glyphOrder = result.ttFont.GlyphOrder?.[0];
        if (glyphOrder && glyphOrder.GlyphID && glyphOrder.GlyphID.length > 0) {
          // Add nodef glyph
          internalGlyphs.push(glyphOrder.GlyphID[0].$.name);
        }

        const nameFilter = {
          GlyphOrder: "GlyphID",
          hmtx: "mtx",
          glyf: "TTGlyph",
          post: "psName",
        };

        for (const [key, value] of Object.entries(nameFilter)) {
          let xmlGroup = result.ttFont[key]?.[0];
          if (key === "post") {
            xmlGroup = result.ttFont[key]?.[0]?.extraNames?.[0];
          }
          if (xmlGroup && xmlGroup[value]) {
            const allIcons = xmlGroup[value];
            xmlGroup[value] = xmlGroup[value].filter((entry: any) =>
              shouldInclude(entry.$.name, internalGlyphs, safeList, blockList),
            );

            if (key === "post") {
              debugLog(
                debug,
                `Removed ${allIcons.length - xmlGroup[value].length} icons`,
              );
            }
          }
        }

        // Remove Ligature elements
        if (
          result.ttFont.GSUB &&
          result.ttFont.GSUB[0].LookupList &&
          result.ttFont.GSUB[0].LookupList[0].Lookup
        ) {
          for (const lookup of result.ttFont.GSUB[0].LookupList[0].Lookup) {
            if (lookup.LigatureSubst && lookup.LigatureSubst[0].LigatureSet) {
              for (const ligatureSet of lookup.LigatureSubst[0].LigatureSet) {
                if (ligatureSet.Ligature) {
                  ligatureSet.Ligature = ligatureSet.Ligature.filter(
                    (ligature: any) =>
                      shouldInclude(
                        ligature.$.glyph,
                        internalGlyphs,
                        safeList,
                        blockList,
                      ),
                  );
                }
              }
              lookup.LigatureSubst[0].LigatureSet =
                lookup.LigatureSubst[0].LigatureSet.filter(
                  (set: any) => set.Ligature.length > 0,
                );
            }
          }
        }
      }

      const xml = builder.buildObject(result);

      await fs.writeFile(tmp, xml);
    } catch (err) {
      console.error("Error:", err);
    }
  }
};
