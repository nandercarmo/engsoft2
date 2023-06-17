import { Request, Response } from 'express';
import { RocketController } from "../../../src/controller/RocketController";
import { RocketService } from "../../../src/service/RocketService";
import { mockedRocketDto, mockedRocketDtos } from '../../mocks/RocketMock';

jest.mock('../../../src/service/RocketService');

const RocketServiceMock = RocketService as jest.Mock<RocketService>;

describe('RocketController tests', () => {

	const rocketServiceMock = new RocketServiceMock() as jest.Mocked<RocketService>;
	const rocketController = new RocketController(rocketServiceMock);

	test('Should return a list of rockets', async () => {

		rocketServiceMock.getRockets.mockResolvedValue(mockedRocketDtos);

		const rockets = await rocketController.getAll({} as Request, { json: () => { } } as Response)

		expect(rocketServiceMock.getRockets).toHaveBeenCalledTimes(1);
		expect(rockets).toEqual(mockedRocketDtos);
	});

	test('Should return a specific rocket', async () => {

		const rocketId = '1';
		const request = { params: { id: rocketId } } as Request<{ id: string }>;

		rocketServiceMock.getRocket.mockResolvedValue(mockedRocketDto);

		const rocket = await rocketController.get(request, { json: () => { } } as Response);

		expect(rocketServiceMock.getRocket).toHaveBeenCalledTimes(1);
		expect(rocketServiceMock.getRocket).toHaveBeenCalledWith(parseInt(rocketId));
		expect(rocket).toEqual(mockedRocketDto);
	});

	test('Should create a new rocket', async () => {

		const rocketId = '1';
		const request = { body: mockedRocketDto } as Request;

		rocketServiceMock.createRocket.mockResolvedValue(mockedRocketDto);

		const rocket = await rocketController.create(request, { json: () => { } } as Response);

		expect(rocketServiceMock.createRocket).toHaveBeenCalledTimes(1);
		expect(rocketServiceMock.createRocket).toHaveBeenCalledWith(mockedRocketDto);
		expect(rocket).toEqual(mockedRocketDto);
	});

	test('Should update a specific rocket', async () => {

		const rocketId = '1';
		const request = { params: { id: rocketId }, body: mockedRocketDto } as Request<{ id: string }>;

		rocketServiceMock.updateRocket.mockResolvedValue(mockedRocketDto);

		const rocket = await rocketController.update(request, { json: () => { } } as Response);

		expect(rocketServiceMock.updateRocket).toHaveBeenCalledTimes(1);
		expect(rocketServiceMock.updateRocket).toHaveBeenCalledWith(parseInt(rocketId), mockedRocketDto);
		expect(rocket).toEqual(mockedRocketDto);
	});

	test('Should delete a rocket', async () => {

		const rocketId = '1';
		const request = { params: { id: rocketId } } as Request<{ id: string }>;

		rocketServiceMock.deleteRocket.mockResolvedValue();

		const rocket = await rocketController.delete(request, { json: () => { } } as Response);

		expect(rocketServiceMock.deleteRocket).toHaveBeenCalledTimes(1);
		expect(rocketServiceMock.deleteRocket).toHaveBeenCalledWith(parseInt(rocketId));
		expect(rocketServiceMock.deleteRocket).toHaveReturned();
		expect(rocket).toBeUndefined();
	});
});