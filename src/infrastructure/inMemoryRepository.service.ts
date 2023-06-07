import { Repository, School } from "../types.ts";

export class InMemoryRepository implements Repository {
  constructor(private readonly schools: School[] = []) {}

  getSchools(): Promise<School[]> {
    return Promise.resolve(this.schools);
  }
}
