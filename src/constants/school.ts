export enum SchoolType {
	Private = 'Private',
	Public = 'Public',
	Hybrid = 'Hybrid',
}

export enum SchoolLevel {
	Infant = 'Infant',
	Primary = 'Primary',
	Secondary = 'Secondary',
	AdultBasic = 'Adult Basic',
	Prepara = 'Prepara',
	PreparaRegular = 'Prepara Regular',
	Unknown = 'Unknown',
}

export const SCHOOL_TYPE_MAP = {
	PUBLICO: SchoolType.Public,
	SEMIOFICIAL: SchoolType.Hybrid,
	PRIVADO: SchoolType.Private,
}

export const SCHOOL_LEVEL_MAP = {
	INICIAL: SchoolLevel.Infant,
	PRIMARIA: SchoolLevel.Primary,
	SECUNDARIA: SchoolLevel.Secondary,
	PRIMARIO: SchoolLevel.Primary,
	'BASICA DE ADULTOS': SchoolLevel.AdultBasic,
	'PREPARA REGULAR': SchoolLevel.PreparaRegular,
	PREPARA: SchoolLevel.PreparaRegular,
	'PREPARA ACELERA': SchoolLevel.Prepara,
}

export const DATABASE_PATH = './data/database.json'
