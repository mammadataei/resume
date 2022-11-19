import { emptyDir } from "https://deno.land/std@0.164.0/fs/mod.ts";
import puppeteer from "https://deno.land/x/puppeteer@16.2.0/mod.ts";
import { toAbsolutePath } from "./utils/helpers.ts";
import { render } from "./utils/render.ts";

const OUTPUT_DIR = toAbsolutePath(import.meta.url, "./dist");

console.log('Purging "dist" directory...');
await emptyDir(OUTPUT_DIR);

const content = await render();
const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
await page.setContent(content, { waitUntil: "networkidle0" });

console.log("Generating PDF file...");
await page.pdf({
  path: `${OUTPUT_DIR}/resume.pdf`,
  format: "A4",
  displayHeaderFooter: false,
  printBackground: true,
  margin: {
    top: "12.7mm",
    right: "12.7mm",
    bottom: "17.018mm",
    left: "15.24mm",
  },
});

await browser.close();
console.log("Done!");
