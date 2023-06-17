import { ICreateCrewDto, ICrewDto, IUpdateCrewDto } from "../../src/dto/CrewDto";
import { Crew } from "../../src/model/Crew";
import { mockedCrewmanDtos, mockedCrewmans } from "./CrewmanMock";

const mockedCrewDto1: ICrewDto = { id: 1, name: 'Crew 1', crewmans: mockedCrewmanDtos };
const mockedCrewDto2: ICrewDto = { id: 2, name: 'Crew 2' };

const mockedCrewDtos: ICrewDto[] = [
	mockedCrewDto1,
	mockedCrewDto2,
];

const mockedCreateCrewDto: ICreateCrewDto = {
	name: 'Crew 1',
	crewmans: [1, 2]
};

const mockedUpdateCrewDto: IUpdateCrewDto = {
	name: 'Crew 1',
	crewmans: [1, 2]
};

const mockedCrew1: Crew = new Crew(1, 'Crew 1', mockedCrewmans);
const mockedCrew2: Crew = new Crew(1, 'Crew 2', []);

const mockedCrews: Crew[] = [
	mockedCrew1,
	mockedCrew2
]

export {
	mockedCrewDto1 as mockedCrewDto,
	mockedCrewDtos,
	mockedCrew1 as mockedCrew,
	mockedCrews,
	mockedCreateCrewDto,
	mockedUpdateCrewDto
};
