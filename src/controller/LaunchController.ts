import { Request, Response } from "express";
import { ICreateLaunchDto, ILaunchDto, IUpdateLaunchDto } from "../dto/LaunchDto";
import { RequestErrorHandler } from "../middleware/log/Logger";
import { ILaunchService } from "../service/LaunchService";
import { IController } from "./Controller";

class LaunchController implements IController<ILaunchDto> {

	private launchService: ILaunchService;

	constructor(service: ILaunchService) {
		this.launchService = service;
	}

	async getAll(req: Request, res: Response): Promise<ILaunchDto[] | undefined> {
		try {
			const launchs = await this.launchService.getLaunchs();
			res.json(launchs);
			return launchs;
		} catch (error) {
			RequestErrorHandler(error as Error, req, res, () => { });
		}
	}

	async get(req: Request, res: Response): Promise<ILaunchDto | undefined> {
		try {
			const launch = await this.launchService.getLaunch(parseInt(req.params.id));
			res.json(launch);
			return launch;

		} catch (error) {
			RequestErrorHandler(error as Error, req, res, () => { });
		}
	}

	async create(req: Request, res: Response): Promise<ILaunchDto | undefined> {
		try {
			const body: ICreateLaunchDto = req.body
			const launch = await this.launchService.createLaunch(body);
			res.json(launch);
			return launch;

		} catch (error) {
			console.log(error);
			RequestErrorHandler(error as Error, req, res, () => { });
		}
	}

	async update(req: Request, res: Response): Promise<ILaunchDto | undefined> {
		try {
			const body: IUpdateLaunchDto = req.body
			const launch = await this.launchService.updateLaunch(parseInt(req.params.id), body);
			res.json(launch);
			return launch;

		} catch (error) {
			RequestErrorHandler(error as Error, req, res, () => { });
		}
	}

	async delete(req: Request, res: Response) {
		try {
			res.json(await this.launchService.deleteLaunch(parseInt(req.params.id)));
		} catch (error) {
			RequestErrorHandler(error as Error, req, res, () => { });
		}
	}
}

export {
	LaunchController
};
