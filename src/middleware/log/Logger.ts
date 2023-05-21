import { format } from 'date-fns';
import { NextFunction, Request, Response } from "express";

const RequestLogHandler = (req: Request, res: Response, next: NextFunction) => {
	console.log(`[\x1b[36mINFO\x1b[0m]  ${format(new Date(), 'dd/MM/yyyy HH:mm:ss')} ${req.method} request from ${req.headers.origin ? req.headers.origin : 'localhost:3333'} on ${req.url}`);
	next();
};

const RequestErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
	console.log(`[\x1b[31mERROR\x1b[0m] ${format(new Date(), 'dd/MM/yyyy HH:mm:ss')} Error on handling ${req.method} request from ${req.headers.origin ? req.headers.origin : 'localhost:3333'} on ${req.url} - ${err.message}`);

	const status = err.message.includes('404 Not Found') ? 404 : 500;
	res.status(status).json({ status: status, message: err.message });
	next();
};

const Log = (message: string) => {
	console.log(`[\x1b[36mINFO\x1b[0m]  ${format(new Date(), 'dd/MM/yyyy HH:mm:ss')} ${message}`);
};

const LogError = (message: string) => {
	console.log(`[\x1b[31mERROR\x1b[0m] ${format(new Date(), 'dd/MM/yyyy HH:mm:ss')} ${message}`);
};

export {
	RequestLogHandler,
	RequestErrorHandler,
	Log,
	LogError
};
