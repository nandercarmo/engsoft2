import { RocketRepository } from "../../../src/repository/RocketRepository";
import { RocketService } from "../../../src/service/RocketService";
import { mockedRocket, mockedRockets } from '../../mocks/RocketMock';

jest.mock('../../../src/repository/RocketRepository');

const RocketRepositoryMock = RocketRepository as jest.Mock<RocketRepository>;

describe('RocketService tests', () => {

	const rocketRepositoryMock = new RocketRepositoryMock() as jest.Mocked<RocketRepository>;
	const rocketService = new RocketService(rocketRepositoryMock);

	test('Should return a list of rockets', async () => {

		rocketRepositoryMock.findAll.mockResolvedValue(mockedRockets);

		const rockets = await rocketService.getRockets()

		expect(rocketRepositoryMock.findAll).toHaveBeenCalledTimes(1);
		expect(rockets).toEqual(mockedRockets);
	});

	test('Should return a specific rocket', async () => {

		rocketRepositoryMock.findById.mockResolvedValue(mockedRocket);

		const rocketId = 1;
		const rocket = await rocketService.getRocket(rocketId);

		expect(rocketRepositoryMock.findById).toHaveBeenCalledTimes(1);
		expect(rocketRepositoryMock.findById).toHaveBeenCalledWith(rocketId);
		expect(rocket).toEqual(mockedRocket);
	});

	test('Should create a new rocket', async () => {

		rocketRepositoryMock.create.mockResolvedValue({ ...mockedRocket, id: 0 });

		const rocket = await rocketService.createRocket(mockedRocket);

		expect(rocketRepositoryMock.create).toHaveBeenCalledTimes(1);
		expect(rocketRepositoryMock.create).toHaveBeenCalledWith({ ...mockedRocket, id: 0 });
		expect(rocket).toEqual({ ...mockedRocket, id: 0 });
	});

	test('Should update a specific rocket', async () => {

		rocketRepositoryMock.update.mockResolvedValue(mockedRocket);

		const rocketId = 1;
		const rocket = await rocketService.updateRocket(rocketId, mockedRocket);

		expect(rocketRepositoryMock.update).toHaveBeenCalledTimes(1);
		expect(rocketRepositoryMock.update).toHaveBeenCalledWith(rocketId, mockedRocket);
		expect(rocket).toEqual(mockedRocket);
	});

	test('Should delete a rocket', async () => {

		rocketRepositoryMock.delete.mockResolvedValue();

		const rocketId = 1;
		const rocket = await rocketService.deleteRocket(rocketId);

		expect(rocketRepositoryMock.delete).toHaveBeenCalledTimes(1);
		expect(rocketRepositoryMock.delete).toHaveBeenCalledWith(rocketId);
		expect(rocketRepositoryMock.delete).toHaveReturned();
		expect(rocket).toBeUndefined();
	});
});