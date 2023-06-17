import { ICreateCrewmanDto, ICrewmanDto, IUpdateCrewmanDto } from "../dto/CrewmanDto";
import { IRepository } from "../repository/Repository";

interface ICrewmanService {
	getCrewmans(): Promise<ICrewmanDto[]>;
	getCrewman(id: number): Promise<ICrewmanDto>;
	createCrewman(crewman: ICreateCrewmanDto): Promise<ICrewmanDto>;
	updateCrewman(id: number, crewman: IUpdateCrewmanDto): Promise<ICrewmanDto>;
	deleteCrewman(id: number): Promise<void>;
}

class CrewmanService implements ICrewmanService {

	private crewmanRepository: IRepository<ICrewmanDto>;

	constructor(repository: IRepository<ICrewmanDto>) {
		this.crewmanRepository = repository;
	}

	async getCrewmans(): Promise<ICrewmanDto[]> {
		return await this.crewmanRepository.findAll();
	}

	async getCrewman(id: number): Promise<ICrewmanDto> {
		return await this.crewmanRepository.findById(id);
	}

	async createCrewman(crewman: ICreateCrewmanDto): Promise<ICrewmanDto> {
		return await this.crewmanRepository.create(crewman);
	}

	async updateCrewman(id: number, crewman: IUpdateCrewmanDto): Promise<ICrewmanDto> {

		const updatedCrewman = await this.crewmanRepository.findById(id);
		updatedCrewman.name = crewman.name;
		updatedCrewman.patent = crewman.patent;

		return await this.crewmanRepository.update(id, updatedCrewman);
	}

	async deleteCrewman(id: number): Promise<void> {
		await this.crewmanRepository.delete(id);
	}
}

export {
	ICrewmanService,
	CrewmanService
};
