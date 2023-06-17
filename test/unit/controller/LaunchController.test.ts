import { Request, Response } from 'express';
import { LaunchController } from "../../../src/controller/LaunchController";
import { LaunchService } from "../../../src/service/LaunchService";
import { mockedLaunchDto, mockedLaunchDtos } from '../../mocks/LaunchMock';

jest.mock('../../../src/service/LaunchService');

const LaunchServiceMock = LaunchService as jest.Mock<LaunchService>;

describe('LaunchController tests', () => {

	const launchServiceMock = new LaunchServiceMock() as jest.Mocked<LaunchService>;
	const launchController = new LaunchController(launchServiceMock);

	test('Should return a list of launchs', async () => {

		launchServiceMock.getLaunchs.mockResolvedValue(mockedLaunchDtos);

		const launchs = await launchController.getAll({} as Request, { json: () => { } } as Response)

		expect(launchServiceMock.getLaunchs).toHaveBeenCalledTimes(1);
		expect(launchs).toEqual(mockedLaunchDtos);
	});

	test('Should return a specific launch', async () => {

		const launchId = '1';
		const request = { params: { id: launchId } } as Request<{ id: string }>;

		launchServiceMock.getLaunch.mockResolvedValue(mockedLaunchDto);

		const launch = await launchController.get(request, { json: () => { } } as Response);

		expect(launchServiceMock.getLaunch).toHaveBeenCalledTimes(1);
		expect(launchServiceMock.getLaunch).toHaveBeenCalledWith(parseInt(launchId));
		expect(launch).toEqual(mockedLaunchDto);
	});

	test('Should create a new launch', async () => {

		const launchId = '1';
		const request = { body: mockedLaunchDto } as Request;

		launchServiceMock.createLaunch.mockResolvedValue(mockedLaunchDto);

		const launch = await launchController.create(request, { json: () => { } } as Response);

		expect(launchServiceMock.createLaunch).toHaveBeenCalledTimes(1);
		expect(launchServiceMock.createLaunch).toHaveBeenCalledWith(mockedLaunchDto);
		expect(launch).toEqual(mockedLaunchDto);
	});

	test('Should update a specific launch', async () => {

		const launchId = '1';
		const request = { params: { id: launchId }, body: mockedLaunchDto } as Request<{ id: string }>;

		launchServiceMock.updateLaunch.mockResolvedValue(mockedLaunchDto);

		const launch = await launchController.update(request, { json: () => { } } as Response);

		expect(launchServiceMock.updateLaunch).toHaveBeenCalledTimes(1);
		expect(launchServiceMock.updateLaunch).toHaveBeenCalledWith(parseInt(launchId), mockedLaunchDto);
		expect(launch).toEqual(mockedLaunchDto);
	});

	test('Should delete a launch', async () => {

		const launchId = '1';
		const request = { params: { id: launchId } } as Request<{ id: string }>;

		launchServiceMock.deleteLaunch.mockResolvedValue();

		const launch = await launchController.delete(request, { json: () => { } } as Response);

		expect(launchServiceMock.deleteLaunch).toHaveBeenCalledTimes(1);
		expect(launchServiceMock.deleteLaunch).toHaveBeenCalledWith(parseInt(launchId));
		expect(launchServiceMock.deleteLaunch).toHaveReturned();
		expect(launch).toBeUndefined();
	});
});