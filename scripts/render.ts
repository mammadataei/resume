import fs from 'fs'
import path from 'path'
import Handlebars from 'handlebars'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export function render() {
  const resume = JSON.parse(fs.readFileSync('resume.json', 'utf-8'))

  const css = fs.readFileSync(
    path.resolve(__dirname, '../template/style.css'),
    'utf-8',
  )

  const template = fs.readFileSync(
    path.resolve(__dirname, '../template/resume.hbs'),
    'utf-8',
  )

  const partials = fs.readdirSync(path.join(__dirname, '../template/partials'))

  partials.forEach(function (filename) {
    const matches = /^([^.]+).hbs$/.exec(filename)
    if (!matches) {
      return
    }

    const name = matches[1]
    const filepath = path.join(
      path.join(__dirname, '../template/partials'),
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
