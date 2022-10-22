import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { defineConfig, Plugin } from 'vite'
import handlebars from 'vite-plugin-handlebars'
import Unocss from 'unocss/vite'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const resume = JSON.parse(fs.readFileSync('resume.json', 'utf-8'))

export default defineConfig({
  root: 'src',
  plugins: [
    Unocss(),
    handlebars({
      context: {
        resume,
      },
      partialDirectory: path.resolve(__dirname, 'src/partials'),
    }) as Plugin,
  ],
})
