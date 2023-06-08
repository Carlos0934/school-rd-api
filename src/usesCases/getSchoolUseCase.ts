import { School, SchoolService, UseCase } from "../types.ts";

export class GetSchoolUseCase implements UseCase<string, School | null> {
  constructor(private readonly schoolService: SchoolService) {}

  async execute(code: string): Promise<School | null> {
    const schools = await this.schoolService.getSchools({
      filter: {
        code,
      },
      pagination: {
        limit: 1,
        page: 1,
      },
    });

    const school = schools.data.at(0) || null;

    return school;
  }
}
