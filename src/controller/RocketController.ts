import { Request, Response } from "express";
import { ICreateRocketDto, IRocketDto, IUpdateRocketDto } from "../dto/RocketDto";
import { RequestErrorHandler } from "../middleware/log/Logger";
import { IRocketService } from "../service/RocketService";
import { IController } from "./Controller";

class RocketController implements IController<IRocketDto> {

	private rocketService: IRocketService;

	constructor(service: IRocketService) {
		this.rocketService = service;
	}

	async getAll(req: Request, res: Response): Promise<IRocketDto[] | undefined> {
		try {
			const rockets = await this.rocketService.getRockets();
			res.json(rockets);
			return rockets;
		} catch (error) {
			RequestErrorHandler(error as Error, req, res, () => { });
		}
	}

	async get(req: Request, res: Response): Promise<IRocketDto | undefined> {
		try {
			const rocket = await this.rocketService.getRocket(parseInt(req.params.id));
			res.json(rocket);
			return rocket;

		} catch (error) {
			RequestErrorHandler(error as Error, req, res, () => { });
		}
	}

	async create(req: Request, res: Response): Promise<IRocketDto | undefined> {
		try {
			const body: ICreateRocketDto = req.body
			const rocket = await this.rocketService.createRocket(body);
			res.json(rocket);
			return rocket;

		} catch (error) {
			console.log(error);
			RequestErrorHandler(error as Error, req, res, () => { });
		}
	}

	async update(req: Request, res: Response): Promise<IRocketDto | undefined> {
		try {
			const body: IUpdateRocketDto = req.body
			const rocket = await this.rocketService.updateRocket(parseInt(req.params.id), body);
			res.json(rocket);
			return rocket;

		} catch (error) {
			RequestErrorHandler(error as Error, req, res, () => { });
		}
	}

	async delete(req: Request, res: Response) {
		try {
			res.json(await this.rocketService.deleteRocket(parseInt(req.params.id)));
		} catch (error) {
			RequestErrorHandler(error as Error, req, res, () => { });
		}
	}
}

export {
	RocketController
};
