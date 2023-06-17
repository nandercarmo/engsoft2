import { Request, Response } from "express";

interface IController<ReturnType> {
	getAll(req: Request, res: Response): Promise<ReturnType[] | undefined>;
	get(req: Request, res: Response): Promise<ReturnType | undefined>;
	create(req: Request, res: Response): Promise<ReturnType | undefined>;
	update(req: Request, res: Response): Promise<ReturnType | undefined>;
	delete(req: Request, res: Response): Promise<void | undefined>;
};

export {
	IController
};
