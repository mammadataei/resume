import puppeteer, {
  Browser,
} from "https://deno.land/x/puppeteer@16.2.0/mod.ts";
import {
  Command,
  EnumType,
} from "https://deno.land/x/cliffy@v0.25.7/command/mod.ts";
import { toAbsolutePath } from "../utils/helpers.ts";
import { renderLetter, renderResume } from "../utils/render.tsx";

const Page = new EnumType(["resume", "letter"]);

await new Command()
  .type("page", Page)
  .name("Build")
  .description("Build the resume and cover letter.")
  .version("v1.0.0")
  .option("-f, --fileName [file:string]", "Output file name.")
  .arguments("<page:page>")
  .action(async ({ fileName }, page) => {
    const OUTPUT_DIR = toAbsolutePath(import.meta.url, "../dist");

    console.log("Preparing browser...");
    const browser = await puppeteer.launch({ headless: true });

    if (page === "resume") {
      const outputFileName = fileName || "resume";

      console.log("Rendering resume...");
      const resume = await renderResume();

      console.log(`Generating ${outputFileName}.pdf...`);
      await printContent(
        browser,
        resume,
        `${OUTPUT_DIR}/${outputFileName}.pdf`
      );
    }

    if (page === "letter") {
      const outputFileName = fileName || "letter";

      console.log("Rendering letter...");
      const letter = await renderLetter();

      console.log(`Generating ${outputFileName}.pdf...`);
      await printContent(
        browser,
        letter,
        `${OUTPUT_DIR}/${outputFileName}.pdf`
      );
    }

    await browser.close();
    console.log("Done!");
  })
  .parse();

async function printContent(browser: Browser, content: string, path: string) {
  const page = await browser.newPage();
  await page.setContent(content, { waitUntil: "networkidle0" });

  await page.pdf({
    path,
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
