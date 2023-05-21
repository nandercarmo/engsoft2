import { ICrewDto } from "./CrewDto";
import { IRocketDto } from "./RocketDto";

interface ILaunchDto {
	id?: number,
	launchCode: string;
	date: string;
	success: boolean;
	rocket?: IRocketDto;
	rocketId?: number;
	crew?: ICrewDto;
	crewId?: number;
};

interface ICreateLaunchDto {
	launchCode: string;
	date: string;
	success: boolean;
	rocketId?: number;
	crewId?: number;
};

interface IUpdateLaunchDto {
	launchCode: string;
	date: string;
	success: boolean;
	rocketId?: number;
	crewId?: number;
};

export {
	ILaunchDto,
	ICreateLaunchDto,
	IUpdateLaunchDto
}