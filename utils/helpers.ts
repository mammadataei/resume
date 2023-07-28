import { dirname, fromFileUrl, resolve } from "../deps.ts";

export function toAbsolutePath(
  moduleURL: string,
  relativePath: string,
): string {
  const __dirname = dirname(fromFileUrl(moduleURL));
  return resolve(__dirname, relativePath);
}
