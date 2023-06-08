import { SchoolMother } from '../utils/schoolMother.ts'
import { SchoolUseCaseBuilder } from '../utils/schoolUseCases.ts'
import { assertEquals } from 'asserts'

Deno.test('Should return school by name', async () => {
	const name = 'School Name'
	const data = SchoolMother.randomWithParams({ name })
	const searchSchoolUseCase = SchoolUseCaseBuilder.buildSearchSchoolUseCase([
		SchoolMother.random(),
		SchoolMother.random(),
		data,
	])

	const result = await searchSchoolUseCase.execute({ filter: { name } })

	assertEquals(result.data.at(0)?.name, data.name)
})

Deno.test('Should return school by code and name', async () => {
	const code = '0003'
	const name = 'School Name'
	const data = SchoolMother.randomWithParams({ code, name })
	const searchSchoolUseCase = SchoolUseCaseBuilder.buildSearchSchoolUseCase([
		SchoolMother.random(),
		SchoolMother.random(),
		data,
	])

	const result = await searchSchoolUseCase.execute({ filter: { code, name } })

	assertEquals(result.data.at(0)?.code, data.code)
})

Deno.test('Should limit the number of results', async () => {
	const limit = 5
	const data = SchoolMother.randomList(limit)
	const searchSchoolUseCase = SchoolUseCaseBuilder.buildSearchSchoolUseCase(
		data,
	)

	const result = await searchSchoolUseCase.execute({
		pagination: { limit },
	})

	assertEquals(result.data.length, limit)
})

Deno.test('Should paginate the results', async () => {
	const limit = 5
	const page = 2
	const data = SchoolMother.randomList(limit * page)
	const slicedData = data.slice(limit, limit * page)
	const searchSchoolUseCase = SchoolUseCaseBuilder.buildSearchSchoolUseCase(
		data,
	)

	const result = await searchSchoolUseCase.execute({
		pagination: { limit, page },
	})

	assertEquals(result.data.length, limit)
	assertEquals(result.data, slicedData)
})

Deno.test('Should return the total number of results', async () => {
	const limit = 5
	const page = 2
	const data = SchoolMother.randomList(limit * page)
	const searchSchoolUseCase = SchoolUseCaseBuilder.buildSearchSchoolUseCase(
		data,
	)

	const result = await searchSchoolUseCase.execute({
		pagination: { limit, page },
	})

	assertEquals(result.count, data.length)
})
