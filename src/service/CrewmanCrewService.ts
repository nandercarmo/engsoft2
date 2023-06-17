import { ICreateCrewmanCrewDto, ICrewmanCrewDto, IUpdateCrewmanCrewDto } from "../dto/CrewmanCrewDto";
import { IRepository } from "../repository/Repository";

interface ICrewmanCrewService {
	getCrewmanCrews(): Promise<ICrewmanCrewDto[]>;
	createCrewmanCrew(crewmanCrew: ICreateCrewmanCrewDto): Promise<ICrewmanCrewDto>;
	deleteCrewmanCrew(id: number): Promise<void>;
}

class CrewmanCrewService implements ICrewmanCrewService {

	private crewmanCrewRepository: IRepository<ICrewmanCrewDto>;

	constructor(repository: IRepository<ICrewmanCrewDto>) {
		this.crewmanCrewRepository = repository;
	}

	async getCrewmanCrews(): Promise<ICrewmanCrewDto[]> {
		return await this.crewmanCrewRepository.findAll();
	}

	async createCrewmanCrew(crewmanCrew: ICreateCrewmanCrewDto): Promise<ICrewmanCrewDto> {
		return await this.crewmanCrewRepository.create(crewmanCrew);
	}

	async deleteCrewmanCrew(id?: number): Promise<void> {
		if(id !== undefined) await this.crewmanCrewRepository.delete(id);
	}
}

export {
	ICrewmanCrewService,
	CrewmanCrewService
}