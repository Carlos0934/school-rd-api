import { SchoolService } from '../services/school.service.ts'
import { Page, School, SchoolQuery, UseCase } from '../types.ts'

export class SearchSchoolUseCase implements UseCase<SchoolQuery, Page<School>> {
	constructor(private readonly schoolService: SchoolService) {}

	async execute(query: SchoolQuery): Promise<Page<School>> {
		const schools = await this.schoolService.getSchools(query)

		return schools
	}
}
