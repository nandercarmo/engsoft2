interface ICrewmanCrewDto {
	id?: number;
	crewmanId: number;
	crewId: number;
};

interface ICreateCrewmanCrewDto {
	crewmanId: number;
	crewId: number;
};

interface IUpdateCrewmanCrewDto {
	crewmanId: number;
	crewId: number;
};

export {
	ICrewmanCrewDto,
	ICreateCrewmanCrewDto,
	IUpdateCrewmanCrewDto
}