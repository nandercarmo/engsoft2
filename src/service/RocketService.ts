import { ICreateRocketDto, IRocketDto, IUpdateRocketDto } from "../dto/RocketDto";
import { Rocket } from "../model/Rocket";
import { IRepository } from "../repository/Repository";

interface IRocketService {
	getRockets(): Promise<IRocketDto[]>;
	getRocket(rocketId: number): Promise<IRocketDto | undefined>;
	createRocket(rocket: ICreateRocketDto): Promise<IRocketDto>;
	updateRocket(id: number, rocket: IUpdateRocketDto): Promise<IRocketDto>;
	deleteRocket(id: number): Promise<void>;
}

class RocketService implements IRocketService {

	private rocketRepository: IRepository<Rocket>;

	constructor(repository: IRepository<Rocket>) {
		this.rocketRepository = repository;
	}

	async getRockets(): Promise<IRocketDto[]> {
		return await this.rocketRepository.findAll();
	}

	async getRocket(rocketId?: number): Promise<IRocketDto | undefined> {
		if (rocketId === undefined) return undefined
		return await this.rocketRepository.findById(rocketId);
	}

	async createRocket(rocket: ICreateRocketDto): Promise<IRocketDto> {
		return await this.rocketRepository.create(new Rocket(0, rocket.name));
	}

	async updateRocket(id: number, rocket: IUpdateRocketDto): Promise<IRocketDto> {

		const updatedRocket = await this.rocketRepository.findById(id);
		updatedRocket.name = rocket.name;

		return await this.rocketRepository.update(id, updatedRocket);
	}

	async deleteRocket(id: number): Promise<void> {
		await this.rocketRepository.delete(id);
	}
}

export {
	IRocketService,
	RocketService
};
