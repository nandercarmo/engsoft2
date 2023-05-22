import { ICrewDto } from "../dto/CrewDto";
import { ICreateLaunchDto, ILaunchDto, IUpdateLaunchDto } from "../dto/LaunchDto";
import { IRocketDto } from "../dto/RocketDto";
import { Crew } from "../model/Crew";
import { Launch } from "../model/Launch";
import { Rocket } from "../model/Rocket";
import { LaunchRepository } from "../repository/LaunchRepository";
import { IRepository } from "../repository/Repository";
import { crewServiceGetCrew } from "./CrewService";
import { rocketServiceGetRocket } from "./RocketService";

const launchRepository: IRepository<Launch> = new LaunchRepository();

async function launchServiceGetLaunchs(): Promise<ILaunchDto[]> {
	return await launchRepository.findAll();;
}


async function launchServiceGetLaunch(launchId?: number | undefined): Promise<ILaunchDto | undefined> {
	if (launchId === undefined) return undefined;
	return await launchRepository.findById(launchId);
}

async function launchServiceCreateLaunch(launchDto: ICreateLaunchDto): Promise<ILaunchDto> {

	const rocket = await rocketServiceGetRocket(launchDto.rocketId);
	const crew = await crewServiceGetCrew(launchDto.crewId);

	if (rocket === undefined) {
		throw new Error('Um lançamento obrigatoriamente precisa ser associado a um foguete em sua criação');
	}

	const launch = await launchRepository.create(buildNewLaunch(launchDto, rocket, crew));
	const createdLaunch = await launchServiceGetLaunch(launch.id);

	if (createdLaunch === undefined) {
		throw new Error('Não foi possível criar novo lançamento')
	}

	return createdLaunch;
}

async function launchServiceUpdateLaunch(id: number, launchDto: IUpdateLaunchDto): Promise<ILaunchDto> {

	const oldLaunch = await launchRepository.findById(id);
	const crew = await crewServiceGetCrew(launchDto.crewId);
	const rocket = await rocketServiceGetRocket(launchDto.rocketId);

	if (rocket === undefined) {
		throw new Error(`Não foi possível encontrar rocket com o id ${launchDto.rocketId} para ser attribuído ao launch ${launchDto.launchCode}`)
	}

	const launch = await launchRepository.update(id, update(oldLaunch, launchDto, rocket, crew));
	const updatedLaunch = await launchServiceGetLaunch(launch.id);

	if (updatedLaunch === undefined) {
		throw new Error('Não foi possível criar novo lançamento')
	}

	return updatedLaunch;
}

async function launchServiceDeleteLaunch(id: number): Promise<void> {
	await launchRepository.delete(id);
}

function buildNewLaunch(
	launchDto: ICreateLaunchDto,
	rocket: IRocketDto,
	crew: ICrewDto | undefined
): Launch {

	return new Launch(
		0,
		launchDto.launchCode,
		launchDto.date,
		launchDto.success,
		new Rocket(rocket.id ?? 0, rocket.name),
		new Crew(crew?.id ?? 0, crew?.name ?? '', [])
	);
}

function update(
	oldLaunch: Launch,
	launchDto: IUpdateLaunchDto,
	rocket: IRocketDto,
	crew: ICrewDto | undefined
): Launch {

	oldLaunch.rocket = new Rocket(rocket.id ?? 0, rocket.name)
	oldLaunch.launchCode = launchDto.launchCode;
	oldLaunch.date = launchDto.date;
	oldLaunch.success = launchDto.success;

	if (crew === undefined) oldLaunch.crew = undefined;
	else oldLaunch.crew = new Crew(crew?.id ?? 0, crew?.name ?? '', []);

	return oldLaunch;
}
export {
	launchServiceGetLaunchs,
	launchServiceGetLaunch,
	launchServiceCreateLaunch,
	launchServiceUpdateLaunch,
	launchServiceDeleteLaunch
};
