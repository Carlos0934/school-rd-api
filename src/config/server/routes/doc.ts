import { Hono } from 'https://deno.land/x/hono@v3.2.4/mod.ts'

const docRoute = new Hono()

docRoute.get('/', async (ctx) => {
	try {
		const doc = await Deno.open('./src/config/server/doc.raml')

		return ctx.newResponse(doc.readable, 200, {
			'Content-Type': 'application/raml+yaml',
		})
	} catch (error) {
		return ctx.json(
			{
				error: error.message,
			},
			500,
		)
	}
})

export default docRoute
