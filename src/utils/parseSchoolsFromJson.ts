import { SchoolLevel, SchoolType } from "../constants/school.ts";
import { SCHOOL_LEVEL_MAP } from "../constants/school.ts";
import { SCHOOL_TYPE_MAP } from "../constants/school.ts";
import { School } from "../types.ts";

export function parseSchoolFromJson(json: Record<string, string>[]): School[] {
  const parseName = (name: string) => {
    const [code, ...fullName] = name.split(" - ");
    return { code, fullName: fullName.join(" - ") };
  };

  const parseDistrict = (district: string) => {
    return district.split(" - ")[0];
  };

  const parseType = (type: string) => {
    return (
      SCHOOL_TYPE_MAP[type as keyof typeof SCHOOL_TYPE_MAP] || SchoolType.Public
    );
  };

  const parseLevels = (levels: string) => {
    return levels
      .split(" - ")
      .map(
        (level) =>
          SCHOOL_LEVEL_MAP[level as keyof typeof SCHOOL_LEVEL_MAP] ||
          SchoolLevel.Unknown
      );
  };

  const parsePremise = (premise: string) => {
    return premise.split(" - ")[0];
  };

  const parseRegion = (region: string) => {
    return region.split(" - ")[0];
  };

  const parseCoordinates = (coordinates: string[]) => {
    return coordinates.map((coordinate) => parseFloat(coordinate));
  };

  const schools: School[] = [];

  for (const school of json) {
    const { code, fullName: name } = parseName(school["Centros"]);
    const schoolObj: School = {
      code,
      name,
      districtCode: parseDistrict(school["Distrito"]),
      regionalCode: parseRegion(school["Regional"]),
      type: parseType(school["Sector"]),
      levels: parseLevels(school["Nivel"]),
      enrollment: parseInt(school["Matricula"]),
      province: school["Provincia"],
      municipality: school["Municipio"],
      premise: parsePremise(school["Planta Fisica"]),
      coordinates: parseCoordinates([
        school["Coordenadas Latitud"],
        school["Coordenadas Longitud"],
      ]),
    };

    schools.push(schoolObj);
  }

  return schools;
}
