import { CrewmanRepository } from "../../../src/repository/CrewmanRepository";
import { CrewmanService } from "../../../src/service/CrewmanService";
import { mockedCrewman, mockedCrewmans } from '../../mocks/CrewmanMock';

jest.mock('../../../src/repository/CrewmanRepository');

const CrewmanRepositoryMock = CrewmanRepository as jest.Mock<CrewmanRepository>;

describe('CrewmanService tests', () => {

	const crewmanRepositoryMock = new CrewmanRepositoryMock() as jest.Mocked<CrewmanRepository>;
	const crewmanService = new CrewmanService(crewmanRepositoryMock);

	test('Should return a list of crewmans', async () => {

		crewmanRepositoryMock.findAll.mockResolvedValue(mockedCrewmans);

		const crewmans = await crewmanService.getCrewmans()

		expect(crewmanRepositoryMock.findAll).toHaveBeenCalledTimes(1);
		expect(crewmans).toEqual(mockedCrewmans);
	});

	test('Should return a specific crewman', async () => {

		crewmanRepositoryMock.findById.mockResolvedValue(mockedCrewman);

		const crewmanId = 1;
		const crewman = await crewmanService.getCrewman(crewmanId);

		expect(crewmanRepositoryMock.findById).toHaveBeenCalledTimes(1);
		expect(crewmanRepositoryMock.findById).toHaveBeenCalledWith(crewmanId);
		expect(crewman).toEqual(mockedCrewman);
	});

	test('Should create a new crewman', async () => {

		crewmanRepositoryMock.create.mockResolvedValue(mockedCrewman);

		const crewman = await crewmanService.createCrewman(mockedCrewman);

		expect(crewmanRepositoryMock.create).toHaveBeenCalledTimes(1);
		expect(crewmanRepositoryMock.create).toHaveBeenCalledWith(mockedCrewman);
		expect(crewman).toEqual(mockedCrewman);
	});

	test('Should update a specific crewman', async () => {

		crewmanRepositoryMock.update.mockResolvedValue(mockedCrewman);

		const crewmanId = 1;
		const crewman = await crewmanService.updateCrewman(crewmanId, mockedCrewman);

		expect(crewmanRepositoryMock.update).toHaveBeenCalledTimes(1);
		expect(crewmanRepositoryMock.update).toHaveBeenCalledWith(crewmanId, mockedCrewman);
		expect(crewman).toEqual(mockedCrewman);
	});

	test('Should delete a crewman', async () => {

		crewmanRepositoryMock.delete.mockResolvedValue();

		const crewmanId = 1;
		const crewman = await crewmanService.deleteCrewman(crewmanId);

		expect(crewmanRepositoryMock.delete).toHaveBeenCalledTimes(1);
		expect(crewmanRepositoryMock.delete).toHaveBeenCalledWith(crewmanId);
		expect(crewmanRepositoryMock.delete).toHaveReturned();
		expect(crewman).toBeUndefined();
	});
});