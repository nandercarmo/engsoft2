import { LaunchRepository } from "../../../src/repository/LaunchRepository";
import { CrewService } from "../../../src/service/CrewService";
import { LaunchService } from "../../../src/service/LaunchService";
import { RocketService } from "../../../src/service/RocketService";
import { mockedCrewDto } from "../../mocks/CrewMock";
import { mockedLaunch, mockedLaunchDto, mockedLaunchs } from '../../mocks/LaunchMock';
import { mockedRocketDto } from "../../mocks/RocketMock";

jest.mock('../../../src/repository/LaunchRepository');

jest.mock('../../../src/service/RocketService');
jest.mock('../../../src/service/CrewService');

const LaunchRepositoryMock = LaunchRepository as jest.Mock<LaunchRepository>;

const RocketServiceMock = RocketService as jest.Mock<RocketService>;
const CrewServiceMock = CrewService as jest.Mock<CrewService>;

describe('LaunchService tests', () => {

	const launchRepositoryMock = new LaunchRepositoryMock() as jest.Mocked<LaunchRepository>;

	const rocketServiceMock = new RocketServiceMock() as jest.Mocked<RocketService>;
	const crewServiceMock = new CrewServiceMock() as jest.Mocked<CrewService>;

	const launchService = new LaunchService(launchRepositoryMock, rocketServiceMock, crewServiceMock);

	test('Should return a list of launchs', async () => {

		launchRepositoryMock.findAll.mockResolvedValue(mockedLaunchs);

		const launchs = await launchService.getLaunchs()

		expect(launchRepositoryMock.findAll).toHaveBeenCalledTimes(1);
		expect(launchs).toEqual(mockedLaunchs);
	});

	test('Should return a specific launch', async () => {

		launchRepositoryMock.findById.mockResolvedValue(mockedLaunch);

		const launchId = 1;
		const launch = await launchService.getLaunch(launchId);

		expect(launchRepositoryMock.findById).toHaveBeenCalledTimes(1);
		expect(launchRepositoryMock.findById).toHaveBeenCalledWith(launchId);
		expect(launch).toEqual(mockedLaunch);
	});

	test('Should return undefined on not found a specific launch', async () => {

		launchRepositoryMock.findById.mockResolvedValue(mockedLaunch);

		const launchId = undefined;
		const launch = await launchService.getLaunch(launchId);

		expect(launchRepositoryMock.findById).not.toHaveBeenCalled();
		expect(launch).toBeUndefined();
	});

	test('Should create a new launch', async () => {

		launchRepositoryMock.create.mockResolvedValue({ ...mockedLaunch, id: 0 });
		rocketServiceMock.getRocket.mockResolvedValue(mockedRocketDto);
		crewServiceMock.getCrew.mockResolvedValue(mockedCrewDto);
		launchRepositoryMock.findById.mockResolvedValue(mockedLaunch);

		const launch = await launchService.createLaunch(mockedLaunchDto);

		expect(launchRepositoryMock.create).toHaveBeenCalledTimes(1);
		expect(launchRepositoryMock.findById).toHaveBeenCalledTimes(1);
		expect(launch).toEqual(mockedLaunch);
	});

	test('Should throw a expection on not passing a rocket on create a new launch', async () => {

		launchRepositoryMock.create.mockResolvedValue({ ...mockedLaunch, id: 0 });
		rocketServiceMock.getRocket.mockResolvedValue(undefined);

		await expect(launchService.createLaunch(mockedLaunchDto)).rejects.toThrow();
		expect(launchRepositoryMock.create).not.toHaveBeenCalled();
	});

	test('Should update a specific launch', async () => {

		launchRepositoryMock.update.mockResolvedValue({ ...mockedLaunch, id: 0 });
		rocketServiceMock.getRocket.mockResolvedValue(mockedRocketDto);
		crewServiceMock.getCrew.mockResolvedValue(mockedCrewDto);
		launchRepositoryMock.findById.mockResolvedValue(mockedLaunch);

		const launchId = 1;
		const launch = await launchService.updateLaunch(launchId, mockedLaunch);

		expect(launchRepositoryMock.update).toHaveBeenCalledTimes(1);
		expect(launchRepositoryMock.update).toHaveBeenCalledWith(launchId, mockedLaunch);
		expect(launch).toEqual(mockedLaunch);
	});

	test('Should delete a launch', async () => {

		launchRepositoryMock.delete.mockResolvedValue();

		const launchId = 1;
		const launch = await launchService.deleteLaunch(launchId);

		expect(launchRepositoryMock.delete).toHaveBeenCalledTimes(1);
		expect(launchRepositoryMock.delete).toHaveBeenCalledWith(launchId);
		expect(launchRepositoryMock.delete).toHaveReturned();
		expect(launch).toBeUndefined();
	});
});