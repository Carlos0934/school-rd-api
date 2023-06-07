import { SchoolLevel, SchoolType } from "./constants/school.ts";

export type School = {
  name: string;
  code: string;
  districtCode: string;
  province: string;
  type: SchoolType;
  levels: SchoolLevel[];
  municipality: string;
  coordinates: number[];
  premise: string;
  regionalCode: string;

  enrollment: number;
};
export type Page<T> = {
  data: T[];
  page: number;
  count: number;
  nextPage?: number;
  prevPage?: number;
};
export type Database = {
  schools: School[];
};

export type SchoolQuery = {
  filter?: {
    name?: string;
    code?: string;
    districtCode?: string;
    province?: string;
    type?: SchoolType;
    municipality?: string;

    premise?: string;
    regionalCode?: string;
  };
  pagination?: {
    page?: number;
    limit?: number;
  };

  sort?: {
    code?: number;
    name?: number;
    districtCode?: number;
    province?: number;
    type?: number;
    municipality?: number;

    enrollment?: number;
  };
};
export interface Repository {
  getSchools(): Promise<School[]>;
}

export interface SchoolService {
  getSchools(query: SchoolQuery): Promise<Page<School>>;
}

export interface UseCase<T = void, R = void> {
  execute(params: T): Promise<R>;
}
