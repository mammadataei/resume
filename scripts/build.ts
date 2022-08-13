import fs from 'fs-extra'
import puppeteer from 'puppeteer'
import { render } from './render'

console.log('Exporting as PDF...')

const html = render()

const browser = await puppeteer.launch({ headless: true })
const page = await browser.newPage()
await page.setContent(html, { waitUntil: 'networkidle0' })

console.log('Generating PDF...')

const pdf = await page.pdf({
  format: 'A4',
  displayHeaderFooter: false,
  printBackground: true,
})

await browser.close()

console.log('Saving file...')
await fs.remove('./dist')
await fs.ensureDir('./dist')
await fs.writeFile('./dist/resume.pdf', pdf)

console.log('Done!')
