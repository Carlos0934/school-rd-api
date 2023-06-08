import { z } from 'zod'

import { SchoolType } from '../../constants/school.ts'

export const SchoolQuerySchema = z.object({
	name: z.string().optional(),
	code: z.string().optional(),
	districtCode: z.string().optional(),
	province: z.string().optional(),
	type: z.nativeEnum(SchoolType).optional(),
	municipality: z.string().optional(),
	premise: z.string().optional(),
	regionalCode: z.string().optional(),

	page: z.number().optional(),
	limit: z.number().optional(),
})
