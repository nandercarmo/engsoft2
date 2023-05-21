interface ICrewmanDto {
	id?: number,
	name: string;
	patent: string;
};

interface ICreateCrewmanDto {
	name: string;
	patent: string;
};

interface IUpdateCrewmanDto {
	name: string;
	patent: string;
};

export {
	ICrewmanDto,
	ICreateCrewmanDto,
	IUpdateCrewmanDto
}