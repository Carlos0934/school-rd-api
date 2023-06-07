import { Hono } from "hono";
import { SchoolService } from "../../../services/school.service.ts";

import { SchoolQuerySchema } from "../../schemas/schoolQuery.schema.ts";
import { JsonRepository } from "../../../infrastructure/jsonRepository.service.ts";

const schoolRoute = new Hono();

const jsonRepository = new JsonRepository();
const schoolService = new SchoolService(jsonRepository);

schoolRoute.get("/", async (ctx) => {
  const query = ctx.req.queries();

  const parse = SchoolQuerySchema.safeParse(query);
  if (!parse.success)
    return ctx.json(
      {
        error: parse.error,
      },
      400
    );

  const schools = await schoolService.getSchools(query);
  return ctx.json(schools);
});

export default schoolRoute;
