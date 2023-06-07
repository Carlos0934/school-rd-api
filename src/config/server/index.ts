import { Hono } from "hono";
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import schoolRoute from "./routes/school.ts";
import docRoute from "./routes/doc.ts";

export async function startServer() {
  const app = new Hono();

  app.route("/api/schools", schoolRoute);
  app.route("/api/doc", docRoute);

  await serve(app.fetch);
}
