import { Request, Response } from "express";
import { ICreateCrewDto, ICrewDto, IUpdateCrewDto } from "../dto/CrewDto";
import { RequestErrorHandler } from "../middleware/log/Logger";
import { ICrewService } from "../service/CrewService";
import { IController } from "./Controller";

class CrewController implements IController<ICrewDto> {

	private crewService: ICrewService;

	constructor(service: ICrewService) {
		this.crewService = service;
	}

	async getAll(req: Request, res: Response): Promise<ICrewDto[] | undefined> {
		try {
			const crews = await this.crewService.getCrews();
			res.json(crews);
			return crews;
		} catch (error) {
			RequestErrorHandler(error as Error, req, res, () => { });
		}
	}

	async get(req: Request, res: Response): Promise<ICrewDto | undefined> {
		try {
			const crew = await this.crewService.getCrew(parseInt(req.params.id));
			res.json(crew);
			return crew;

		} catch (error) {
			RequestErrorHandler(error as Error, req, res, () => { });
		}
	}

	async create(req: Request, res: Response): Promise<ICrewDto | undefined> {
		try {
			const body: ICreateCrewDto = req.body
			const crew = await this.crewService.createCrew(body);
			res.json(crew);
			return crew;

		} catch (error) {
			console.log(error);
			RequestErrorHandler(error as Error, req, res, () => { });
		}
	}

	async update(req: Request, res: Response): Promise<ICrewDto | undefined> {
		try {
			const body: IUpdateCrewDto = req.body
			const crew = await this.crewService.updateCrew(parseInt(req.params.id), body);
			res.json(crew);
			return crew;

		} catch (error) {
			RequestErrorHandler(error as Error, req, res, () => { });
		}
	}

	async delete(req: Request, res: Response) {
		try {
			res.json(await this.crewService.deleteCrew(parseInt(req.params.id)));
		} catch (error) {
			RequestErrorHandler(error as Error, req, res, () => { });
		}
	}
}

export {
	CrewController
};
