import {
  createGenerator,
  expandGlob,
  Handlebars,
  MagicString,
  presetWebFonts,
  presetWind,
  transformDirectives,
  transformerVariantGroup,
} from "./deps.ts";

const handlebars = new Handlebars({
  baseDir: "template",
  extname: ".hbs",
  layoutsDir: "",
  partialsDir: "partials",
  cachePartials: true,
  defaultLayout: "layout",
  helpers: undefined,
  compilerOptions: undefined,
});

export async function render() {
  return await handlebars.renderView("main", {
    css: await generateCSS(),
    resume: JSON.parse(await Deno.readTextFile("resume.json")),
  });
}

const unoConfig = {
  presets: [
    presetWind(),
    presetWebFonts({
      fonts: {
        sans: "DM Sans:400,500,700",
      },
    }),
  ],

  transformers: [transformerVariantGroup()],

  theme: {
    fontSize: {
      xxs: "0.625rem",
    },
  },
};

async function generateCSS() {
  const templates: Array<string> = [];

  for await (const file of expandGlob("template/**/**.hbs")) {
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

  for await (const file of expandGlob("styles/**/**.css")) {
    externalCSS.push(await Deno.readTextFile(file.path));
  }

  return externalCSS.join("\n");
}

async function transform(code: string) {
  const s = new MagicString(code);
  await transformDirectives(s, createGenerator(unoConfig), {});
  return s.toString();
}
