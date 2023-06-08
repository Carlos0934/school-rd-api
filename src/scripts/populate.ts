import { DATABASE_PATH } from '../constants/school.ts'
import { Database } from '../types.ts'
import { parseSchoolFromJson } from '../utils/parseSchoolsFromJson.ts'

const data = await Deno.readTextFile('./data/schools.json')

const json = JSON.parse(data)

const schools = parseSchoolFromJson(json)

const database: Database = {
	schools,
}

await Deno.writeTextFile(DATABASE_PATH, JSON.stringify(database))
