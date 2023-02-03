import { emptyDir } from "https://deno.land/std@0.164.0/fs/mod.ts";
import puppeteer from "https://deno.land/x/puppeteer@16.2.0/mod.ts";
import { toAbsolutePath } from "./utils/helpers.ts";
import { renderCoverLetter, renderResume } from "./utils/render.ts";

const OUTPUT_DIR = toAbsolutePath(import.meta.url, "./dist");

console.log('Purging "dist" directory...');
await emptyDir(OUTPUT_DIR);

console.log("Loading resume and cover letter...");
const resume = await renderResume();
const coverLetter = await renderCoverLetter();

console.log("Preparing browser...");
const browser = await puppeteer.launch({ headless: true });

console.log("Generating resume.pdf...");
await printContent(resume, "resume.pdf");

console.log("Generating cover-letter.pdf...");
await printContent(coverLetter, "cover-letter.pdf");

await browser.close();
console.log("Done!");

async function printContent(content: string, filename: string) {
  const page = await browser.newPage();
  await page.setContent(content, { waitUntil: "networkidle0" });

  await page.pdf({
    path: `${OUTPUT_DIR}/${filename}`,
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
}
