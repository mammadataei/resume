import { loadResume } from "./loadResume.ts";
import { toAbsolutePath } from "./helpers.ts";
import {
  createGenerator,
  expandGlob,
  Handlebars,
  MagicString,
  presetIcons,
  presetWebFonts,
  presetWind,
  transformDirectives,
  transformerVariantGroup,
} from "../deps.ts";

const handlebars = new Handlebars({
  baseDir: toAbsolutePath(import.meta.url, "../template"),
  extname: ".hbs",
  layoutsDir: "",
  partialsDir: "partials/",
  cachePartials: false,
  defaultLayout: "layout",
  helpers: {
    replace(str: string, a: string, b: string) {
      return str.replace(a, b);
    },
  },
  compilerOptions: undefined,
});

export async function render() {
  return await handlebars.renderView("main", {
    css: await generateCSS(),
    resume: await loadResume(),
  });
}

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

async function generateCSS() {
  const TEMPLATES_GLOB = toAbsolutePath(
    import.meta.url,
    "../template/**/**.hbs"
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
