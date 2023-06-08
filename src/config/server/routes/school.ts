import { Hono } from 'hono'
import { SchoolService } from '../../../services/school.service.ts'

import { SchoolQuerySchema } from '../../schemas/schoolQuery.schema.ts'
import { JsonRepository } from '../../../infrastructure/jsonRepository.ts'

const schoolRoute = new Hono()

const jsonRepository = new JsonRepository()
const schoolService = new SchoolService(jsonRepository)

schoolRoute.get('/', async (ctx) => {
	const query = ctx.req.queries()
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

	const schools = await schoolService.getSchools({
		filter,
		pagination: {
			page,
			limit,
		},
		sort: {
			code: 1,
		},
	})

	return ctx.json(schools)
})

export default schoolRoute
