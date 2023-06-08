import { InMemoryRepository } from "../../src/infrastructure/inMemoryRepository.ts";
import { SchoolService } from "../../src/services/school.service.ts";
import { School } from "../../src/types.ts";
import { GetSchoolUseCase } from "../../src/usesCases/getSchoolUseCase.ts";
import { SearchSchoolUseCase } from "../../src/usesCases/searchSchool.useCase.ts";

export class SchoolUseCaseBuilder {
  static buildSearchSchoolUseCase(data: School[] = []) {
    const repository = new InMemoryRepository(data);

    const service = new SchoolService(repository);

    const searchSchoolsUseCase = new SearchSchoolUseCase(service);

    return searchSchoolsUseCase;
  }

  static buildGetSchoolUseCaseWithSchools(data: School[]) {
    const repository = new InMemoryRepository(data);

    const service = new SchoolService(repository);

    const getSchoolUseCase = new GetSchoolUseCase(service);

    return getSchoolUseCase;
  }
}
