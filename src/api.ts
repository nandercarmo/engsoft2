import { config as dotenvConfig } from 'dotenv';

import bodyParser from 'body-parser';
import express from 'express';

dotenvConfig();

import { dataSource } from './database/config/dataSourceConfig';
import { CorsConfig } from './middleware/config/CorsConfig';
import { Log, LogError, RequestErrorHandler, RequestLogHandler } from './middleware/log/Logger';
import { CrewRouter } from './middleware/router/CrewRouter';
import { CrewmanRouter } from './middleware/router/CrewmanRouter';
import { LaunchRouter } from './middleware/router/LaunchRouter';
import { RocketRouter } from './middleware/router/RocketRouter';

const api = express();

api.use(RequestLogHandler);

api.use(CorsConfig);
api.use(bodyParser.json());

api.use('/rocket', RocketRouter);
api.use('/launch', LaunchRouter);
api.use('/crewman', CrewmanRouter);
api.use('/crew', CrewRouter);
api.use('/', LaunchRouter);

dataSource.initialize()
	.then(() => {

		Log(`Database connection done...`);
		api.listen(process.env.PORT);
		Log(`Server running on port ${process.env.PORT}...`);

	}).catch((err) => {
		LogError(`Database connection failed - ${err}`)
		throw new Error(`Database connection failed - ${err}`);
	});

api.use(RequestErrorHandler);