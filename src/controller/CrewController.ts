import { Request, Response } from "express";
import { ICreateCrewDto, IUpdateCrewDto } from "../dto/CrewDto";
import { RequestErrorHandler } from "../middleware/log/Logger";
import { crewServiceCreateCrew, crewServiceDeleteCrew, crewServiceGetCrew, crewServiceGetCrews, crewServiceUpdateCrew } from "../service/CrewService";

const getCrews = async (req: Request, res: Response) => {
	try {
		res.json(await crewServiceGetCrews());
	} catch (error) {
		RequestErrorHandler(error as Error, req, res, () => { });
	}
}

const getCrew = async (req: Request, res: Response) => {
	try {
		res.json(await crewServiceGetCrew(parseInt(req.params.id)));
	} catch (error) {
		RequestErrorHandler(error as Error, req, res, () => { });
	}
}

const createCrew = async (req: Request, res: Response) => {
	try {
		const body: ICreateCrewDto = req.body
		res.json(await crewServiceCreateCrew(body));
	} catch (error) {
		RequestErrorHandler(error as Error, req, res, () => { });
	}
}

const updateCrew = async (req: Request, res: Response) => {
	try {
		const body: IUpdateCrewDto = req.body
		res.json(await crewServiceUpdateCrew(parseInt(req.params.id), body));
	} catch (error) {
		RequestErrorHandler(error as Error, req, res, () => { });
	}
}

const deleteCrew = async (req: Request, res: Response) => {
	try {
		res.json(await crewServiceDeleteCrew(parseInt(req.params.id)));
	} catch (error) {
		RequestErrorHandler(error as Error, req, res, () => { });
	}
}

export {
	getCrews,
	getCrew,
	createCrew,
	updateCrew,
	deleteCrew
};
