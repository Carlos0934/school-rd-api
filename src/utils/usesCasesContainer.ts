import { JsonRepository } from "../infrastructure/jsonRepository.ts";
import { SchoolService } from "../services/school.service.ts";
import { GetSchoolUseCase } from "../usesCases/getSchoolUseCase.ts";
import { SearchSchoolUseCase } from "../usesCases/searchSchool.useCase.ts";

const jsonRepository = new JsonRepository();
const schoolService = new SchoolService(jsonRepository);
const searchSchoolUseCase = new SearchSchoolUseCase(schoolService);
const getSchoolUseCase = new GetSchoolUseCase(schoolService);

export const usesCasesContainer = {
  school: {
    search: searchSchoolUseCase,
    get: getSchoolUseCase,
  },
};
