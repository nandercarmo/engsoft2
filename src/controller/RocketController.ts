import { Request, Response } from "express";
import { ICreateRocketDto, IUpdateRocketDto } from "../dto/RocketDto";
import { RequestErrorHandler } from "../middleware/log/Logger";
import { 
	rocketServiceCreateRocket, 
	rocketServiceDeleteRocket, 
	rocketServiceGetRocket, 
	rocketServiceGetRockets, 
	rocketServiceUpdateRocket 
} from "../service/RocketService";

const getRockets = async (req: Request, res: Response) => {
	try {
		res.json(await rocketServiceGetRockets());
	} catch (error) {
		RequestErrorHandler(error as Error, req, res, () => { });
	}
}

const getRocket = async (req: Request, res: Response) => {
	try {
		res.json(await rocketServiceGetRocket(parseInt(req.params.id)));
	} catch (error) {
		RequestErrorHandler(error as Error, req, res, () => { });
	}
}

const createRocket = async (req: Request, res: Response) => {
	try {
		const body: ICreateRocketDto = req.body
		res.json(await rocketServiceCreateRocket(body));
	} catch (error) {
		RequestErrorHandler(error as Error, req, res, () => { });
	}
}

const updateRocket = async (req: Request, res: Response) => {
	try {
		const body: IUpdateRocketDto = req.body
		res.json(await rocketServiceUpdateRocket(parseInt(req.params.id), body));
	} catch (error) {
		RequestErrorHandler(error as Error, req, res, () => { });
	}
}

const deleteRocket = async (req: Request, res: Response) => {
	try {
		res.json(await rocketServiceDeleteRocket(parseInt(req.params.id)));
	} catch (error) {
		RequestErrorHandler(error as Error, req, res, () => { });
	}
}

export {
	getRockets,
	getRocket,
	createRocket,
	updateRocket,
	deleteRocket
};
