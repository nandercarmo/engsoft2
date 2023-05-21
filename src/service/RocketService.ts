import { ICreateRocketDto, IRocketDto, IUpdateRocketDto } from "../dto/RocketDto";
import { Rocket } from "../model/Rocket";
import { IRepository } from "../repository/Repository";
import { RocketRepository } from "../repository/RocketRepository";

	
const rocketRepository: IRepository<Rocket> = new RocketRepository();

async function rocketServiceGetRockets(): Promise<IRocketDto[]> {
	return await rocketRepository.findAll();
}

async function rocketServiceGetRocket(rocketId?: number): Promise<IRocketDto | undefined> {
	if(rocketId === undefined) return undefined
	return await rocketRepository.findById(rocketId);
}

async function rocketServiceCreateRocket(rocket: ICreateRocketDto): Promise<IRocketDto> {
	return await rocketRepository.create(new Rocket(0, rocket.name));
}

async function rocketServiceUpdateRocket(id: number, rocket: IUpdateRocketDto): Promise<IRocketDto> {
	
	const updatedRocket = await rocketRepository.findById(id);	
	updatedRocket.name = rocket.name;

	return await rocketRepository.update(id, updatedRocket);
}

async function rocketServiceDeleteRocket(id: number): Promise<void> {
	await rocketRepository.delete(id);
}

export {
	rocketServiceGetRockets,
	rocketServiceGetRocket,
	rocketServiceCreateRocket,
	rocketServiceUpdateRocket,
	rocketServiceDeleteRocket
};
