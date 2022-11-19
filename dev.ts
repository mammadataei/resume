import { refresh, serve } from "./deps.ts";
import { render } from "./utils/render.ts";

const middleware = refresh();

serve(async (req) => {
  const res = middleware(req);

  if (res) return res;

  return new Response(await render(), {
    headers: { "Content-Type": "text/html" },
  });
});
