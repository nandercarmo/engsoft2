import { Request, Response } from "express";
import { ICreateCrewmanDto, IUpdateCrewmanDto } from "../dto/CrewmanDto";
import { RequestErrorHandler } from "../middleware/log/Logger";
import { crewmanServiceCreateCrewman, crewmanServiceDeleteCrewman, crewmanServiceGetCrewman, crewmanServiceGetCrewmans, crewmanServiceUpdateCrewman } from "../service/CrewmanService";

const getCrewmans = async (req: Request, res: Response) => {
	try {
		res.json(await crewmanServiceGetCrewmans());
	} catch (error) {
		RequestErrorHandler(error as Error, req, res, () => { });
	}
}

const getCrewman = async (req: Request, res: Response) => {
	try {
		res.json(await crewmanServiceGetCrewman(parseInt(req.params.id)));
	} catch (error) {
		RequestErrorHandler(error as Error, req, res, () => { });
	}
}

const createCrewman = async (req: Request, res: Response) => {
	try {
		const body: ICreateCrewmanDto = req.body
		res.json(await crewmanServiceCreateCrewman(body));
	} catch (error) {
		RequestErrorHandler(error as Error, req, res, () => { });
	}
}

const updateCrewman = async (req: Request, res: Response) => {
	try {
		const body: IUpdateCrewmanDto = req.body
		res.json(await crewmanServiceUpdateCrewman(parseInt(req.params.id), body));
	} catch (error) {
		RequestErrorHandler(error as Error, req, res, () => { });
	}
}

const deleteCrewman = async (req: Request, res: Response) => {
	try {
		res.json(await crewmanServiceDeleteCrewman(parseInt(req.params.id)));
	} catch (error) {
		RequestErrorHandler(error as Error, req, res, () => { });
	}
}

export {
	getCrewmans,
	getCrewman,
	createCrewman,
	updateCrewman,
	deleteCrewman
};
