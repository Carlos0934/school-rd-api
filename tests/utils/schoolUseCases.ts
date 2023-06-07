import { InMemoryRepository } from "../../src/infrastructure/inMemoryRepository.service.ts";
import { SchoolService } from "../../src/services/school.service.ts";
import { School } from "../../src/types.ts";
import { SearchSchoolUseCase } from "../../src/usesCases/searchSchool.useCase.ts";

export class SchoolUseCaseBuilder {
  static buildSearchSchoolUseCase(data: School[] = []) {
    const repository = new InMemoryRepository(data);

    const service = new SchoolService(repository);

    const searchSchoolsUseCase = new SearchSchoolUseCase(service);

    return searchSchoolsUseCase;
  }
}
