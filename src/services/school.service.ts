import { Page, Repository, School, SchoolQuery } from "../types.ts";

export class SchoolService {
  constructor(private readonly repository: Repository) {}
  async getSchools(query: SchoolQuery): Promise<Page<School>> {
    const schools = await this.repository.getSchools();
    const filteredData = this.filterSchools(schools, query.filter);

    const sortedData = this.sortSchools(filteredData, query.sort);
    const paginatedData = this.paginateSchools(
      sortedData,
      schools.length,
      query.pagination
    );

    return paginatedData;
  }

  private filterSchools(schools: School[], filter: SchoolQuery["filter"]) {
    if (!filter) {
      return schools;
    }

    return schools.filter((school) => {
      const keys = Object.keys(filter) as (keyof SchoolQuery["filter"])[];

      return keys.every((key) => {
        const value = filter[key];
        if (value === undefined) {
          return true;
        }
        if (key === "name") {
          return school.name.includes(value);
        }
        if (key === "code") {
          return school.code.includes(value);
        }
        if (key === "districtCode") {
          return school.districtCode.includes(value);
        }
        if (key === "province") {
          return school.province.includes(value);
        }
        if (key === "type") {
          return school.type.includes(value);
        }
        if (key === "municipality") {
          return school.municipality.includes(value);
        }
        if (key === "premise") {
          return school.premise.includes(value);
        }
        if (key === "regionalCode") {
          return school.regionalCode.includes(value);
        }
        return true;
      });
    });
  }

  private sortSchools(schools: School[], sort: SchoolQuery["sort"]) {
    if (!sort) {
      return schools;
    }

    return schools.sort((a, b) => {
      if (sort.code) {
        return sort.code * a.code.localeCompare(b.code);
      }

      if (sort.name) {
        return sort.name * a.name.localeCompare(b.name);
      }

      if (sort.districtCode) {
        return sort.districtCode * a.districtCode.localeCompare(b.districtCode);
      }

      if (sort.province) {
        return sort.province * a.province.localeCompare(b.province);
      }

      if (sort.type) {
        return sort.type * a.type.localeCompare(b.type);
      }

      if (sort.municipality) {
        return sort.municipality * a.municipality.localeCompare(b.municipality);
      }

      return 0;
    });
  }

  private paginateSchools(
    schools: School[],
    count: number,
    pagination: SchoolQuery["pagination"]
  ): Page<School> {
    if (!pagination || !pagination.page || !pagination.limit) {
      return {
        data: schools,
        page: 1,
        count,
      };
    }

    const { page, limit } = pagination;

    const totalPages = Math.ceil(count / limit);
    const nextPage = page < totalPages ? page + 1 : undefined;
    const prevPage = page > 1 ? page - 1 : undefined;

    const offset = (page - 1) * limit;
    const data = schools.slice(offset, offset + limit);

    return {
      data,
      page,
      count,
      nextPage,
      prevPage,
    };
  }
}
