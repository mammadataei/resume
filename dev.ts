import { refresh, serve } from "./deps.ts";
import { renderLetter, renderResume } from "./utils/render.ts";

const middleware = refresh();

serve(async (req) => {
  const res = middleware(req);

  if (res) return res;

  if (new URL(req.url).pathname === "/letter") {
    return new Response(await renderLetter(), {
      headers: { "Content-Type": "text/html" },
    });
  }

  return new Response(await renderResume(), {
    headers: { "Content-Type": "text/html" },
  });
});
