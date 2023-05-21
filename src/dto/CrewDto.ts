import { ICrewmanDto } from "./CrewmanDto";

interface ICrewDto {
	id?: number,
	name: string;
	crewmans?: ICrewmanDto[];
};

interface ICreateCrewDto {
	name: string;
	crewmans?: number[];
};

interface IUpdateCrewDto {
	name: string;
	crewmans?: number[];
};

export {
	ICrewDto,
	ICreateCrewDto,
	IUpdateCrewDto
}