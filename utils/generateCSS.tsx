import {
  createGenerator,
  expandGlob,
  MagicString,
  presetIcons,
  presetWebFonts,
  presetWind,
  transformDirectives,
  transformerVariantGroup,
} from "../deps.ts";
import { toAbsolutePath } from "./helpers.ts";

const unoConfig = {
  presets: [
    presetWind(),
    presetIcons({
      cdn: "https://esm.sh/",
      extraProperties: {
        display: "inline-block",
        "vertical-align": "middle",
      },
    }),
    presetWebFonts({
      fonts: {
        sans: "Inter Tight:200,300,400,500,600,700,800",
      },
    }),
  ],

  transformers: [transformerVariantGroup()],
};

export async function generateCSS() {
  const TEMPLATES_GLOB = toAbsolutePath(
    import.meta.url,
    "../template/**/**.tsx",
  );

  const templates: Array<string> = [];

  for await (const file of expandGlob(TEMPLATES_GLOB)) {
    templates.push(await Deno.readTextFile(file.path));
  }

  const unocss = createGenerator({
    ...unoConfig,
    preflights: [
      {
        getCSS: async () => await transform(await resolveStyles()),
      },
    ],
  });

  const { css } = await unocss.generate(templates.join("\n"));

  return css;
}

async function resolveStyles() {
  const externalCSS: Array<string> = [];
  const STYLES_GLOB = toAbsolutePath(import.meta.url, "../styles/**/**.css");

  for await (const file of expandGlob(STYLES_GLOB)) {
    externalCSS.push(await Deno.readTextFile(file.path));
  }

  return externalCSS.join("\n");
}

async function transform(code: string) {
  const s = new MagicString(code);
  await transformDirectives(s, createGenerator(unoConfig), {});
  return s.toString();
}
