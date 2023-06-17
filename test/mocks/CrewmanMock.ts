import { ICrewmanDto } from "../../src/dto/CrewmanDto";
import { Crewman } from "../../src/model/Crewman";

const mockedCrewmanDto1: ICrewmanDto = { id: 1, name: 'Crewman 1', patent: 'Capitan' };
const mockedCrewmanDto2: ICrewmanDto = { id: 2, name: 'Crewman 2', patent: 'Crew' };

const mockedCrewmanDtos: ICrewmanDto[] = [
	mockedCrewmanDto1,
	mockedCrewmanDto2,
];

const mockedCrewman1: Crewman = new Crewman(1, 'Crewman 1', 'Capitan');
const mockedCrewman2: Crewman = new Crewman(1, 'Crewman 2', 'Crew');

const mockedCrewmans: Crewman[] = [
	mockedCrewman1,
	mockedCrewman2
]

export {
	mockedCrewmanDto1 as mockedCrewmanDto,
	mockedCrewmanDtos,
	mockedCrewman1 as mockedCrewman,
	mockedCrewmans
};
