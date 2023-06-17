import { Request, Response } from "express";
import { ICreateCrewmanDto, ICrewmanDto, IUpdateCrewmanDto } from "../dto/CrewmanDto";
import { RequestErrorHandler } from "../middleware/log/Logger";
import { ICrewmanService } from "../service/CrewmanService";
import { IController } from "./Controller";

class CrewmanController implements IController<ICrewmanDto> {

	private crewmanService: ICrewmanService;

	constructor(crewmanService: ICrewmanService) {
		this.crewmanService = crewmanService;
	}

	async getAll(req: Request, res: Response): Promise<ICrewmanDto[] | undefined> {
		try {
			const crewmans = await this.crewmanService.getCrewmans();
			res.json(crewmans);
			return crewmans;
		} catch (error) {
			RequestErrorHandler(error as Error, req, res, () => { });
		}
	}

	async get(req: Request, res: Response): Promise<ICrewmanDto | undefined> {
		try {
			const crewman = await this.crewmanService.getCrewman(parseInt(req.params.id));
			res.json(crewman);
			return crewman;
		} catch (error) {
			RequestErrorHandler(error as Error, req, res, () => { });
		}
	}

	async create(req: Request, res: Response): Promise<ICrewmanDto | undefined> {
		try {
			const body: ICreateCrewmanDto = req.body
			const crewman = await this.crewmanService.createCrewman(body);
			res.json(crewman);
			return crewman;
		} catch (error) {
			RequestErrorHandler(error as Error, req, res, () => { });
		}
	}

	async update(req: Request, res: Response): Promise<ICrewmanDto | undefined> {
		try {
			const body: IUpdateCrewmanDto = req.body
			const crewman = await this.crewmanService.updateCrewman(parseInt(req.params.id), body);
			res.json(crewman);
			return crewman;
		} catch (error) {
			RequestErrorHandler(error as Error, req, res, () => { });
		}
	}

	async delete(req: Request, res: Response): Promise<void> {
		try {
			res.json(await this.crewmanService.deleteCrewman(parseInt(req.params.id)));
		} catch (error) {
			RequestErrorHandler(error as Error, req, res, () => { });
		}
	}
}

export {
	CrewmanController
};
