import path from 'path'
import fs from 'fs-extra'
import puppeteer from 'puppeteer'
import Handlebars from 'handlebars'
import { fileURLToPath } from 'url'
import { createGenerator } from 'unocss'
import { transformDirectives } from '@unocss/transformer-directives'
import MagicString from 'magic-string'
import UnoConfig from '../unocss.config'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const resume = JSON.parse(await fs.readFile('resume.json', 'utf-8'))

async function transform(code: string) {
  const s = new MagicString(code)
  await transformDirectives(s, createGenerator(UnoConfig), {})
  return s.toString()
}

async function render() {
  const styles = await fs.readFile(
    path.resolve(__dirname, '../src/styles.css'),
    'utf-8',
  )

  const template = await fs.readFile(
    path.resolve(__dirname, '../src/index.html'),
    'utf-8',
  )

  const partialTemplates: Array<string> = []
  const partials = await fs.readdir(path.join(__dirname, '../src/partials'))

  for await (const filename of partials) {
    const matches = /^([^.]+).html$/.exec(filename)

    if (matches) {
      const name = matches[1]
      const filepath = path.join(
        path.join(__dirname, '../src/partials'),
        filename,
      )

      const partialCode = await fs.readFile(filepath, 'utf8')

      partialTemplates.push(partialCode)
      Handlebars.registerPartial(name, partialCode)
    }
  }

  const uno = createGenerator({
    ...UnoConfig,
    preflights: [{ getCSS: async () => await transform(styles) }],
  })

  const allTemplates = [template, partialTemplates].join('\n')
  const { css, matched } = await uno.generate(allTemplates)

  console.log(`${[...matched].length} utility classes generated.`)

  return Handlebars.compile(template)({
    css: css,
    resume: resume,
  })
}

async function buildPDF(content: string) {
  console.log('Generating PDF file...')

  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()
  await page.setContent(content, { waitUntil: 'networkidle0' })

  const pdf = await page.pdf({
    format: 'A4',
    displayHeaderFooter: false,
    printBackground: true,
    margin: {
      top: '12.7mm',
      right: '12.7mm',
      bottom: '17.018mm',
      left: '15.24mm',
    },
  })

  await browser.close()
  return pdf
}

async function saveFile(file: Buffer, filename: string) {
  console.log('Purging "dist" directory...')
  await fs.remove('./dist')
  await fs.ensureDir('./dist')

  console.log(`Saving file ${filename}...`)
  await fs.writeFile(`./dist/${filename}`, file)

  console.log('File saved!')
}

console.log('exporting resume as PDF...')

await saveFile(await buildPDF(await render()), 'resume.pdf')

console.log('Done!')
