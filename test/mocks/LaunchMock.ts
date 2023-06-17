import { ILaunchDto } from "../../src/dto/LaunchDto";
import { Launch } from "../../src/model/Launch";
import { mockedCrew, mockedCrewDto } from "./CrewMock";
import { mockedRocket, mockedRocketDto } from "./RocketMock";

const mockedLaunchDto1: ILaunchDto = {
	id: 1,
	launchCode: 'Launch 1',
	date: '10/05/2023',
	success: true,
	rocket: mockedRocketDto,
	crew: mockedCrewDto
};

const mockedLaunchDto2: ILaunchDto = {
	id: 2,
	launchCode: 'Launch 2',
	date: '11/05/2023',
	success: false,
	rocket: mockedRocketDto
};

const mockedLaunchDtos: ILaunchDto[] = [
	mockedLaunchDto1,
	mockedLaunchDto2,
];

const mockedLaunch1: Launch = new Launch(1, 'Launch 1', '08/05/2023', true, mockedRocket, mockedCrew);
const mockedLaunch2: Launch = new Launch(2, 'Launch 2', '09/05/2023', false, mockedRocket);

const mockedLaunchs: Launch[] = [
	mockedLaunch1,
	mockedLaunch2
]

export {
	mockedLaunchDto1 as mockedLaunchDto,
	mockedLaunchDtos,
	mockedLaunch1 as mockedLaunch,
	mockedLaunchs
};
