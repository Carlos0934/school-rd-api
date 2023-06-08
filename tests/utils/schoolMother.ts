import { faker } from 'faker'
import { School } from '../../src/types.ts'
import { SchoolLevel, SchoolType } from '../../src/constants/school.ts'

export class SchoolMother {
	static random(): School {
		return {
			code: faker.string.alphanumeric(10),
			coordinates: [faker.location.longitude(), faker.location.latitude()],
			districtCode: faker.string.alphanumeric(10),
			enrollment: faker.number.int({ min: 0, max: 1000 }),
			levels: faker.helpers.arrayElements(
				[
					SchoolLevel.Infant,
					SchoolLevel.Primary,
					SchoolLevel.Secondary,
					SchoolLevel.Prepara,
					SchoolLevel.PreparaRegular,
					SchoolLevel.AdultBasic,
				],
				3,
			),
			municipality: faker.location.city(),
			name: faker.company.name(),
			premise: faker.string.alphanumeric(10),
			province: faker.location.state(),
			regionalCode: faker.string.alphanumeric(10),
			type: faker.helpers.arrayElement([
				SchoolType.Public,
				SchoolType.Private,
				SchoolType.Hybrid,
			]),
		}
	}

	static randomList(size: number): School[] {
		const schools: School[] = []
		for (let i = 0; i < size; i++) {
			schools.push(this.random())
		}
		return schools
	}

	static randomWithParams(params: Partial<School>): School {
		return {
			...this.random(),
			...params,
		}
	}
}
