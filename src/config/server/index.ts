import { Hono } from "hono";
import "https://deno.land/std@0.190.0/dotenv/load.ts";
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import schoolRoute from "./routes/school.ts";
import docRoute from "./routes/doc.ts";
import { rateLimitMiddleware } from "./middlewares/ratelimit.ts";

export async function startServer() {
  const app = new Hono();
  app.use("/api/*", rateLimitMiddleware);
  app.route("/api/schools", schoolRoute);
  app.route("/api/doc", docRoute);

  await serve(app.fetch);
}
