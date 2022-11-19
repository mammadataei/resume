import { loadEnv } from "../deps.ts";
import { toAbsolutePath } from "./helpers.ts";

const env = loadEnv();

await Deno.writeTextFile(
  toAbsolutePath(import.meta.url, "../env.d.ts"),
  `declare interface ENV {
  ${Object.entries(env)
    .map(([key, value]) => `${key}: "${value}";`)
    .join("\n\t")}
}`
);
