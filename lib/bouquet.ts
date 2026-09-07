export type BouquetSelection = {
  flower: string;
  color: string;
  wrap: string;
};

export type BouquetResult = {
  name: string;
  description: string;
  /** Emoji stand-ins for the arrangement, shown in the result panel. */
  stems: string[];
};

/* ==========================================================================
 *
 *                  >>> REAL BOUQUET ALGORITHM GOES HERE <<<
 *
 * This is the single insertion point. The page (app/bouquet/page.tsx) only
 * ever calls generateBouquet() and renders whatever BouquetResult comes back,
 * so the real generator can replace the body of this function without any
 * changes to the page, the styles, or the selection UI.
 *
 * Contract to keep:
 *   in  — BouquetSelection { flower, color, wrap } (values come from
 *         content/bouquet-options.json)
 *   out — BouquetResult { name, description, stems[] }
 *
 * If the real version needs to be async (an API call, an image generator),
 * change the return type to Promise<BouquetResult> and add `await` at the one
 * call site in app/bouquet/BouquetMaker.tsx.
 *
 * Everything below this comment is placeholder behaviour.
 * ========================================================================== */

const FLOWER_GLYPHS: Record<string, string> = {
  Peonies: "🌸",
  Tulips: "🌷",
  Ranunculus: "🌼",
  Wildflowers: "💐",
  Roses: "🌹",
  Hydrangea: "💠",
};

export function generateBouquet(selection: BouquetSelection): BouquetResult {
  const glyph = FLOWER_GLYPHS[selection.flower] ?? "🌸";
  const stemCount = 5 + Math.floor(Math.random() * 4);

  return {
    name: `${selection.color} ${selection.flower.toLowerCase()}`,
    description: `${stemCount} stems, wrapped in ${selection.wrap.toLowerCase()}.`,
    stems: Array.from({ length: stemCount }, () => glyph),
  };
}
