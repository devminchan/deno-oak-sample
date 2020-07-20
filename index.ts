import { Application, Router } from "https://deno.land/x/oak/mod.ts";

const app = new Application();
const router = new Router();

// routes
router.get("/test", (ctx) => {
  ctx.response.body = "Test!";
});

router.get("/err", (ctx) => {
  throw new Error("error");
});

// error handler
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (e) {
    ctx.response.status = e.status || 500;
    ctx.response.body = {
      message: e.message,
    };
  }
});

app.use(router.routes());
app.use(router.allowedMethods());

// 404 error
app.use((ctx) => {
  ctx.response.body = "Not found!";
});

await app.listen({ port: 8000 });
