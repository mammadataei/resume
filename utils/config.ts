import { Config } from "./types.ts";

export const config: Config = {
  variables: {
    PHONE: (env) => env.PHONE,
    EMAIL: (env) => env.EMAIL,
  },
};
