import { z, Schema } from "zod";
import { SchoolQuery } from "../../types.ts";
import { SchoolType } from "../../constants/school.ts";

export const SchoolQuerySchema: Schema<SchoolQuery> = z.object({
  filter: z
    .object({
      name: z.string().optional(),
      code: z.string().optional(),
      districtCode: z.string().optional(),
      province: z.string().optional(),
      type: z.nativeEnum(SchoolType).optional(),
      municipality: z.string().optional(),
      premise: z.string().optional(),
      regionalCode: z.string().optional(),
    })
    .optional(),

  pagination: z
    .object({
      page: z.number().optional(),
      limit: z.number().optional(),
    })
    .optional(),

  sort: z
    .object({
      code: z.number().optional(),
      name: z.number().optional(),
      districtCode: z.number().optional(),
      province: z.number().optional(),
      type: z.number().optional(),
      municipality: z.number().optional(),
      enrollment: z.number().optional(),
    })
    .optional(),
});
