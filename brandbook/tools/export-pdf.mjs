import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import puppeteer from 'puppeteer'
import { marked } from 'marked'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function main() {
  const root = path.resolve(__dirname, '..')
  const mdPath = path.join(root, 'brand-guidelines.md')
  const htmlPath = path.join(root, 'tools', 'preview.html')
  const outPdf = path.join(root, 'ZBUKUROHU_Brandbook.pdf')

  const [md, htmlShell] = await Promise.all([
    fs.readFile(mdPath, 'utf8'),
    fs.readFile(htmlPath, 'utf8'),
  ])

  const content = marked.parse(md)
  const html = htmlShell.replace('<!-- Content injected by export tool -->', content)

  const browser = await puppeteer.launch({ headless: 'new' })
  const page = await browser.newPage()
  await page.setContent(html, { waitUntil: 'networkidle0' })
  await page.emulateMediaType('print')
  await page.pdf({ path: outPdf, format: 'A4', printBackground: true, margin: { top: '16mm', right: '12mm', bottom: '16mm', left: '12mm' } })
  await browser.close()

  console.log('Exported PDF:', outPdf)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
