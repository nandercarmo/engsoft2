import { ICreateCrewmanDto, ICrewmanDto, IUpdateCrewmanDto } from "../dto/CrewmanDto";
import { CrewmanRepository } from "../repository/CrewmanRepository";
import { IRepository } from "../repository/Repository";

const crewmanRepository: IRepository<ICrewmanDto> = new CrewmanRepository();

async function crewmanServiceGetCrewmans(): Promise<ICrewmanDto[]> {
	return await crewmanRepository.findAll();
}

async function crewmanServiceGetCrewman(id: number): Promise<ICrewmanDto> {
	return await crewmanRepository.findById(id);
}

async function crewmanServiceCreateCrewman(crewman: ICreateCrewmanDto): Promise<ICrewmanDto> {
	return await crewmanRepository.create(crewman);
}

async function crewmanServiceUpdateCrewman(id: number, crewman: IUpdateCrewmanDto): Promise<ICrewmanDto> {

	const updatedCrewman = await crewmanRepository.findById(id);
	updatedCrewman.name = crewman.name;
	updatedCrewman.patent = crewman.patent;

	return await crewmanRepository.update(id, updatedCrewman);
}

async function crewmanServiceDeleteCrewman(id: number): Promise<void> {
	await crewmanRepository.delete(id);
}

export {
	crewmanServiceGetCrewmans,
	crewmanServiceGetCrewman,
	crewmanServiceCreateCrewman,
	crewmanServiceUpdateCrewman,
	crewmanServiceDeleteCrewman
};
