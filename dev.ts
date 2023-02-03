import { refresh, serve } from "./deps.ts";
import { renderCoverLetter, renderResume } from "./utils/render.ts";

const middleware = refresh();

serve(async (req) => {
  const res = middleware(req);

  if (res) return res;

  if (new URL(req.url).pathname === "/cover-letter") {
    return new Response(await renderCoverLetter(), {
      headers: { "Content-Type": "text/html" },
    });
  }

  return new Response(await renderResume(), {
    headers: { "Content-Type": "text/html" },
  });
});
