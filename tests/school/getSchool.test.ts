import { assertEquals, assertExists } from 'asserts'
import { SchoolMother } from '../utils/schoolMother.ts'
import { SchoolUseCaseBuilder } from '../utils/schoolUseCases.ts'

Deno.test('Should return the school with the given code', async () => {
	const code = '1234'
	const data = [
		SchoolMother.random(),
		SchoolMother.random(),
		SchoolMother.random(),
		SchoolMother.randomWithParams({ code }),
	]
	const useCase = SchoolUseCaseBuilder.buildGetSchoolUseCaseWithSchools(data)

	const school = await useCase.execute(code)

	assertExists(school)
	assertEquals(school?.code, code)
})

Deno.test('Should return null if the school does not exist', async () => {
	const code = '1234'
	const data = [
		SchoolMother.random(),
		SchoolMother.random(),
		SchoolMother.random(),
		SchoolMother.randomWithParams({ code: '4321' }),
	]
	const useCase = SchoolUseCaseBuilder.buildGetSchoolUseCaseWithSchools(data)

	const school = await useCase.execute(code)

	assertEquals(school, null)
})
