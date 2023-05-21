import { Request, Response } from "express";
import { ICreateLaunchDto, IUpdateLaunchDto } from "../dto/LaunchDto";
import { RequestErrorHandler } from "../middleware/log/Logger";
import { launchServiceCreateLaunch, launchServiceDeleteLaunch, launchServiceGetLaunch, launchServiceGetLaunchs, launchServiceUpdateLaunch } from "../service/LaunchService";

const getLaunchs = async (req: Request, res: Response) => {
	try {
		res.json(await launchServiceGetLaunchs());
	} catch (error) {
		RequestErrorHandler(error as Error, req, res, () => { });
	}
}

const getLaunch = async (req: Request, res: Response) => {
	try {
		res.json(await launchServiceGetLaunch(parseInt(req.params.id)));
	} catch (error) {
		RequestErrorHandler(error as Error, req, res, () => { });
	}
}

const createLaunch = async (req: Request, res: Response) => {
	try {
		const body: ICreateLaunchDto = req.body
		res.json(await launchServiceCreateLaunch(body));
	} catch (error) {
		RequestErrorHandler(error as Error, req, res, () => { });
	}
}

const updateLaunch = async (req: Request, res: Response) => {
	try {
		const body: IUpdateLaunchDto = req.body
		res.json(await launchServiceUpdateLaunch(parseInt(req.params.id), body));
	} catch (error) {
		RequestErrorHandler(error as Error, req, res, () => { });
	}
}

const deleteLaunch = async (req: Request, res: Response) => {
	try {
		res.json(await launchServiceDeleteLaunch(parseInt(req.params.id)));
	} catch (error) {
		RequestErrorHandler(error as Error, req, res, () => { });
	}
}

export {
	getLaunchs,
	getLaunch,
	createLaunch,
	updateLaunch,
	deleteLaunch
};
