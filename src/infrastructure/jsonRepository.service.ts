import { DATABASE_PATH } from "../constants/school.ts";
import { Database, Repository, School } from "../types.ts";

export class JsonRepository implements Repository {
  async getSchools(): Promise<School[]> {
    const database = await this.getDatabase();

    return database.schools;
  }

  private async getDatabase(): Promise<Database> {
    const json = await Deno.readTextFile(DATABASE_PATH);
    const database = JSON.parse(json);

    return database;
  }
}
