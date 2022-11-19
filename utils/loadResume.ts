import { config } from "./config.ts";
import { loadEnv, parseYaml, substitute } from "../deps.ts";
import { toAbsolutePath } from "./helpers.ts";

const env = loadEnv();
const RESUME_PATH = toAbsolutePath(import.meta.url, "../resume.yml");

export async function loadResume() {
  const resumeContent = await Deno.readTextFile(RESUME_PATH);
  const resume = substitute(resumeContent, resolveVariable, { percent: false });

  return parseYaml(resume);
}

function resolveVariable(variable: string) {
  const value = config.variables[variable];

  if (!value) {
    throw new Error(`Variable ${variable} not found`);
  }

  if (typeof value === "function") {
    return value(env as unknown as ENV);
  }

  return value;
}
