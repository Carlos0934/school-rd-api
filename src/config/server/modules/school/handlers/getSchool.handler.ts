import { Handler } from "hono";
import { usesCasesContainer } from "../../../../../utils/usesCasesContainer.ts";

export const getSchoolHandler: Handler = async (ctx) => {
  const id = ctx.req.param("id");

  if (!id) {
    return ctx.json(
      {
        error: "id is required",
      },
      400
    );
  }

  const school = await usesCasesContainer.school.get.execute(id);

  return ctx.json(school);
};
