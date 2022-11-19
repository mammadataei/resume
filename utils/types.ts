export interface Config {
  variables: Record<string, ((env: ENV) => string) | string>;
}
