import { loadEnv, parseYaml, substitute } from "../deps.ts";
import { toAbsolutePath } from "./helpers.ts";
import { LetterSchema, ResumeSchema } from "../schema/schema.ts";
import type { Letter, Resume } from "../schema/types.ts";

const env = loadEnv();

const RESUME_PATH = toAbsolutePath(import.meta.url, "../data/resume.yml");
const LETTER_PATH = toAbsolutePath(import.meta.url, "../data/letter.yml");

export async function loadResume(): Promise<Resume> {
  const resumeContent = await Deno.readTextFile(RESUME_PATH);
  const resume = substitute(resumeContent, resolveVariable, { percent: false });

  return ResumeSchema.parse(parseYaml(resume));
}

export async function loadCoverLetter(): Promise<Letter> {
  const CoverLetterContent = await Deno.readTextFile(LETTER_PATH);
  const CoverLetter = substitute(CoverLetterContent, resolveVariable, {
    percent: false,
  });

  return LetterSchema.parse(parseYaml(CoverLetter));
}

function resolveVariable(variable: string) {
  const value = env[variable];

  if (!value) {
    throw new Error(
      `Variable "${variable}" not found; check the spelling or add it to ".env" file.`,
    );
  }

  return value;
}
