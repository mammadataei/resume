import {
  presetWind,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
  defineConfig,
} from 'unocss'

export default defineConfig({
  presets: [
    presetWind(),
    presetWebFonts({
      fonts: {
        sans: 'Open Sans',
      },
    }),
  ],
  transformers: [transformerVariantGroup(), transformerDirectives()],
})
