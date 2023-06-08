import { Handler } from 'hono'
import { SchoolQuerySchema } from '../../../../schemas/schoolQuery.schema.ts'
import { usesCasesContainer } from '../../../../../utils/usesCasesContainer.ts'

export const getSchoolsHandler: Handler = async (ctx) => {
	const query = ctx.req.queries()

	// take the first value of each query param
	const data = Object.keys(query).reduce((acc, key) => {
		acc[key] = query[key][0]
		return acc
	}, {} as Record<string, string>)

	const parse = SchoolQuerySchema.safeParse(data)

	if (!parse.success) {
		return ctx.json(
			{
				error: parse.error,
			},
			400,
		)
	}

	const {
		data: { limit, page, ...filter },
	} = parse

	const schools = await usesCasesContainer.school.search.execute({
		filter,
		pagination: {
			page,
			limit,
		},
	})

	return ctx.json(schools)
}
