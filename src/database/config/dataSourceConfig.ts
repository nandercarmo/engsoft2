import "dotenv/config";
import "reflect-metadata";

import { DataSource } from "typeorm";

const dataSource = new DataSource({
	type: "postgres",
	host: process.env.TYPEORM_HOST,
	port: parseInt(process.env.TYPEORM_PORT || '5432'),
	username: process.env.TYPEORM_USERNAME,
	password: process.env.TYPEORM_PASSWORD,
	database: process.env.TYPEORM_DATABASE,
	entities: ['./**/model/*.{ts,js}'],
	migrations: ['./**/database/migrations/*.{ts,js}'],
	synchronize: true,
	logging: false,
});

export {
	dataSource
};