import { Hono } from "hono";
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import schoolRoute from "./routes/school.ts";

export async function startServer() {
  const app = new Hono();

  app.route("/api/v1/schools", schoolRoute);

  await serve(app.fetch);
}
