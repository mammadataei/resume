import {
  Application,
  HttpError,
  Router,
  Status,
} from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { renderLetter, renderResume } from "../utils/render.tsx";
const PORT = 8080;

const app = new Application();

// Error handler middleware
app.use(async (context, next) => {
  try {
    await next();
  } catch (e) {
    if (e instanceof HttpError) {
      // deno-lint-ignore no-explicit-any
      context.response.status = e.status as any;
      if (e.expose) {
        context.response.body = `<!DOCTYPE html>
            <html>
              <body>
                <h1>${e.status} - ${e.message}</h1>
              </body>
            </html>`;
      } else {
        context.response.body = `<!DOCTYPE html>
            <html>
              <body>
                <h1>${e.status} - ${Status[e.status]}</h1>
              </body>
            </html>`;
      }
    } else if (e instanceof Error) {
      context.response.status = 500;
      context.response.body = `<!DOCTYPE html>
            <html>
              <body>
                <h1>500 - Internal Server Error</h1>
              </body>
            </html>`;
      console.log("Unhandled Error:", e.message);
      console.log(e.stack);
    }
  }
});

const router = new Router();

// Handle live reload websocket connection
router.get("/_r", async (ctx) => {
  await ctx.upgrade();
});

router.get("/client.js", async (ctx) => {
  ctx.response.body = await Deno.readFile("./scripts/client.js");
});

router.get("/", async (context) => {
  context.response.body = await renderResume();
});

router.get("/letter", async (context) => {
  context.response.body = await renderLetter();
});

app.use(router.routes());
app.use(router.allowedMethods());

app.addEventListener("listen", () => {
  console.log(`Listening on ${`http://localhost:${PORT}`}`);
});

// Start server
await app.listen({ port: PORT });
