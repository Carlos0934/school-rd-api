import { Hono } from 'hono'

import { getSchoolsHandler } from '../handlers/getSchools.handler.ts'
import { getSchoolHandler } from '../handlers/getSchool.handler.ts'

const schoolRoute = new Hono()

schoolRoute.get('/', getSchoolsHandler)
schoolRoute.get('/:id', getSchoolHandler)

export default schoolRoute
