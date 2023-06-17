import { ICreateCrewDto, ICrewDto, IUpdateCrewDto } from "../dto/CrewDto";
import { ICrewmanDto } from "../dto/CrewmanDto";
import { Crew } from "../model/Crew";
import { Crewman } from "../model/Crewman";
import { IRepository } from "../repository/Repository";
import { CrewmanService } from "./CrewmanService";

interface ICrewService {
	getCrews(): Promise<ICrewDto[]>;
	getCrew(crewId?: number): Promise<ICrewDto | undefined>;
	createCrew(crew: ICreateCrewDto): Promise<ICrewDto>;
	updateCrew(id: number, crew: IUpdateCrewDto): Promise<ICrewDto>;
	deleteCrew(id: number): Promise<void>;
}

class CrewService implements ICrewService {

	private crewRepository: IRepository<Crew>;
	private crewmanService: CrewmanService;

	constructor(
		crewRepository: IRepository<Crew>,
		crewmanService: CrewmanService,
	) {
		this.crewRepository = crewRepository;
		this.crewmanService = crewmanService;
	}

	async getCrews(): Promise<ICrewDto[]> {
		const crews = await this.crewRepository.findAll();
		return crews;
	}

	async getCrew(crewId?: number): Promise<ICrewDto | undefined> {

		if (crewId === undefined) return undefined;

		const crew = await this.crewRepository.findById(crewId);
		return crew;
	}

	async createCrew(crewDto: ICreateCrewDto): Promise<ICrewDto> {

		const crewmansDtos = await this.getCrewCrewmans(crewDto);
		const crewmans = crewmansDtos.map(crewman => new Crewman(crewman.id ?? 0, crewman.name, crewman.patent));

		const crew = await this.crewRepository.create({
			id: 0,
			name: crewDto.name,
			crewmans: crewmans
		});

		return crew;
	}

	async updateCrew(id: number, crewDto: IUpdateCrewDto): Promise<ICrewDto> {

		const crew = await this.crewRepository.findById(id);

		const crewmansDtos = await this.getCrewCrewmans(crewDto);
		const crewmans = crewmansDtos.map(crewman => new Crewman(crewman.id ?? 0, crewman.name, crewman.patent));

		crew.name = crewDto.name;
		crew.crewmans = crewmans;

		return await this.crewRepository.update(id, crew);
	}

	async deleteCrew(id: number): Promise<void> {
		await this.crewRepository.delete(id);
	}

	private async getCrewCrewmans(crew: ICreateCrewDto): Promise<ICrewmanDto[]> {

		const crewmans = await this.crewmanService.getCrewmans();

		return crewmans.filter(crewman => crew.crewmans
			?.some(crewmanId => crewmanId === crewman.id)
			?? false
		);
	}
}

export {
	ICrewService,
	CrewService
};
