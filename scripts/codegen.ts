import { zodToJsonSchema } from "https://raw.githubusercontent.com/savy-91/zod-to-json-schema/3.20.4/deno_dist/zodToJsonSchema.ts";

import { LetterSchema, ResumeSchema } from "../schema/schema.ts";

const encoder = new TextEncoder();

console.log("Generating resume JSON schema...");

const resumeJsonSchema = encoder.encode(
  JSON.stringify(zodToJsonSchema(ResumeSchema), null, 2),
);

await Deno.writeFile("./schema/resume.json", resumeJsonSchema);

console.log("Generating letter JSON schema...");

const letterJsonSchema = encoder.encode(
  JSON.stringify(zodToJsonSchema(LetterSchema), null, 2),
);
await Deno.writeFile("./schema/letter.json", letterJsonSchema);
