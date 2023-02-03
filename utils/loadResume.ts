import { loadEnv, parseYaml, substitute } from "../deps.ts";
import { toAbsolutePath } from "./helpers.ts";

const env = loadEnv();

const RESUME_PATH = toAbsolutePath(import.meta.url, "../resume.yml");
const COVER_LETTER_PATH = toAbsolutePath(
  import.meta.url,
  "../cover-letter.yml"
);

export async function loadResume() {
  const resumeContent = await Deno.readTextFile(RESUME_PATH);
  const resume = substitute(resumeContent, resolveVariable, { percent: false });

  return parseYaml(resume);
}

export async function loadCoverLetter() {
  const CoverLetterContent = await Deno.readTextFile(COVER_LETTER_PATH);
  const CoverLetter = substitute(CoverLetterContent, resolveVariable, {
    percent: false,
  });

  return parseYaml(CoverLetter);
}

function resolveVariable(variable: string) {
  const value = env[variable];

  if (!value) {
    throw new Error(
      `Variable "${variable}" not found; check the spelling or add it to ".env" file.`
    );
  }

  return value;
}
