import path from 'path'
import fs from 'fs-extra'
import puppeteer from 'puppeteer'
import Handlebars from 'handlebars'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const resume = JSON.parse(fs.readFileSync('resume.json', 'utf-8'))

export function render() {
  const css = fs.readFileSync(
    path.resolve(__dirname, '../dist/styles.css'),
    'utf-8',
  )

  const template = fs.readFileSync(
    path.resolve(__dirname, '../src/index.html'),
    'utf-8',
  )

  const partials = fs.readdirSync(path.join(__dirname, '../src/partials'))

  partials.forEach(function (filename) {
    const matches = /^([^.]+).hbs$/.exec(filename)
    if (!matches) {
      return
    }

    const name = matches[1]
    const filepath = path.join(
      path.join(__dirname, '../src/partials'),
      filename,
    )

    const partial = fs.readFileSync(filepath, 'utf8')
    Handlebars.registerPartial(name, partial)
  })

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

await saveFile(await buildPDF(render()), 'resume.pdf')

console.log('Done!')
