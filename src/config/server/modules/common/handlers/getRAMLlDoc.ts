import { Handler } from "hono";

export const getRAMLDocHandler: Handler = async (ctx) => {
  try {
    const doc = await Deno.open("./src/config/server/doc.raml");

    return ctx.newResponse(doc.readable, 200, {
      "Content-Type": "application/raml+yaml",
    });
  } catch (error) {
    return ctx.json(
      {
        error: error.message,
      },
      500
    );
  }
};
