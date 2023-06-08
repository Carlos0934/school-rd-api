import { Hono } from 'https://deno.land/x/hono@v3.2.4/mod.ts'
import { getRAMLDocHandler } from '../handlers/getRAMLlDoc.ts'

const docRoute = new Hono()

docRoute.get('/', getRAMLDocHandler)

export default docRoute
