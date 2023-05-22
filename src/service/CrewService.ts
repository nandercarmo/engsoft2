import { ICreateCrewDto, ICrewDto, IUpdateCrewDto } from "../dto/CrewDto";
import { Crew } from "../model/Crew";
import { Crewman } from "../model/Crewman";
import { CrewRepository } from "../repository/CrewRepository";
import { IRepository } from "../repository/Repository";
import { crewmanServiceGetCrewmans } from "./CrewmanService";

const crewRepository: IRepository<Crew> = new CrewRepository();

async function crewServiceGetCrews(): Promise<ICrewDto[]> {
	const crews = await crewRepository.findAll();
	return crews;
}

async function crewServiceGetCrew(crewId?: number): Promise<ICrewDto | undefined> {

	if (crewId === undefined) return undefined;

	const crew = await crewRepository.findById(crewId);
	return crew;
}

async function crewServiceCreateCrew(crewDto: ICreateCrewDto): Promise<ICrewDto> {

	const crewmansDtos = await crewmanServiceGetCrewmans();
	const crewmans = crewmansDtos.filter(crewman => crewDto.crewmans
		?.some(crewmanId => crewmanId === crewman.id)
		?? false
	).map(crewman => new Crewman(crewman.id ?? 0, crewman.name, crewman.patent));

	const crew = await crewRepository.create({
		id: 0,
		name: crewDto.name,
		crewmans: crewmans
	});

	return crew;
}

async function crewServiceUpdateCrew(id: number, crewDto: IUpdateCrewDto): Promise<ICrewDto> {

	const crew = await crewRepository.findById(id);

	if (crew === null) {
		throw new Error('404 Not Found: Não foi possível encontrar o recurso para ser atualizado');
	}

	const crewmans = await getCrewCrewmans(crewDto);

	crew.name = crewDto.name;
	crew.crewmans = crewmans;

	return await crewRepository.update(id, crew);
}

async function crewServiceDeleteCrew(id: number): Promise<void> {
	await crewRepository.delete(id);
}

async function getCrewCrewmans(crew: ICreateCrewDto): Promise<Crewman[]> {

	const crewmans = await crewmanServiceGetCrewmans();

	return crewmans.filter(crewman => crew.crewmans
		?.some(crewmanId => crewmanId === crewman.id)
		?? false
	)
	.map(crewman => new Crewman(crewman.id ?? 0, crewman.name, crewman.patent));
}

export {
	crewServiceGetCrews,
	crewServiceGetCrew,
	crewServiceCreateCrew,
	crewServiceUpdateCrew,
	crewServiceDeleteCrew
};
