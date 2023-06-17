import { ICrewDto } from "../dto/CrewDto";
import { ICreateLaunchDto, ILaunchDto, IUpdateLaunchDto } from "../dto/LaunchDto";
import { IRocketDto } from "../dto/RocketDto";
import { Crew } from "../model/Crew";
import { Launch } from "../model/Launch";
import { Rocket } from "../model/Rocket";
import { IRepository } from "../repository/Repository";
import { CrewService } from "./CrewService";
import { RocketService } from "./RocketService";

interface ILaunchService {
	getLaunchs(): Promise<ILaunchDto[]>;
	getLaunch(launchId?: number): Promise<ILaunchDto | undefined>;
	createLaunch(launch: ICreateLaunchDto): Promise<ILaunchDto>;
	updateLaunch(id: number, launch: IUpdateLaunchDto): Promise<ILaunchDto>;
	deleteLaunch(id: number): Promise<void>;
}

class LaunchService implements ILaunchService {

	private launchRepository: IRepository<Launch>;
	private rocketService: RocketService;
	private crewService: CrewService;

	constructor(
		launchRepository: IRepository<Launch>,
		rocketService: RocketService,
		crewService: CrewService
	) {
		this.launchRepository = launchRepository;
		this.rocketService = rocketService;
		this.crewService = crewService;
	}

	async getLaunchs(): Promise<ILaunchDto[]> {
		return await this.launchRepository.findAll();;
	}


	async getLaunch(launchId?: number | undefined): Promise<ILaunchDto | undefined> {
		if (launchId === undefined) return undefined;
		return await this.launchRepository.findById(launchId);
	}

	async createLaunch(launchDto: ICreateLaunchDto): Promise<ILaunchDto> {

		const rocket = await this.rocketService.getRocket(launchDto.rocketId);
		const crew = await this.crewService.getCrew(launchDto.crewId);

		if (rocket === undefined) {
			throw new Error('Um lançamento obrigatoriamente precisa ser associado a um foguete em sua criação');
		}

		const launch = await this.launchRepository.create(this.buildNewLaunch(launchDto, rocket, crew));
		const createdLaunch = await this.getLaunch(launch.id);

		if (createdLaunch === undefined) {
			throw new Error('Não foi possível criar novo lançamento')
		}

		return createdLaunch;
	}

	async updateLaunch(id: number, launchDto: IUpdateLaunchDto): Promise<ILaunchDto> {

		const oldLaunch = await this.launchRepository.findById(id);
		const crew = await this.crewService.getCrew(launchDto.crewId);
		const rocket = await this.rocketService.getRocket(launchDto.rocketId);

		if (rocket === undefined) {
			throw new Error(`Não foi possível encontrar rocket com o id ${launchDto.rocketId} para ser attribuído ao launch ${launchDto.launchCode}`)
		}

		const launch = await this.launchRepository.update(id, this.update(oldLaunch, launchDto, rocket, crew));
		const updatedLaunch = await this.getLaunch(launch.id);

		if (updatedLaunch === undefined) {
			throw new Error('Não foi possível criar novo lançamento')
		}

		return updatedLaunch;
	}

	async deleteLaunch(id: number): Promise<void> {
		await this.launchRepository.delete(id);
	}

	private buildNewLaunch(
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

	private update(
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
}

export {
	ILaunchService,
	LaunchService
};
