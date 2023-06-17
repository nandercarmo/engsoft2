import { CrewRepository } from "../../../src/repository/CrewRepository";
import { CrewmanRepository } from "../../../src/repository/CrewmanRepository";
import { CrewService } from "../../../src/service/CrewService";
import { CrewmanService } from "../../../src/service/CrewmanService";
import { mockedCreateCrewDto, mockedCrew, mockedCrews } from '../../mocks/CrewMock';
import { mockedCrewmans } from "../../mocks/CrewmanMock";

jest.mock('../../../src/repository/CrewRepository');
jest.mock('../../../src/repository/CrewmanRepository');
jest.mock('../../../src/service/CrewmanService');

const CrewRepositoryMock = CrewRepository as jest.Mock<CrewRepository>;
const CrewmanRepositoryMock = CrewmanRepository as jest.Mock<CrewmanRepository>;
const CrewmanServiceMock = CrewmanService as jest.Mock<CrewmanService>;

describe('CrewService tests', () => {

	const crewRepositoryMock = new CrewRepositoryMock() as jest.Mocked<CrewRepository>;
	const crewmanRepositoryMock = new CrewmanRepositoryMock() as jest.Mocked<CrewmanRepository>;
	const crewmanServiceMock = new CrewmanServiceMock(crewmanRepositoryMock) as jest.Mocked<CrewmanService>;
	const crewService = new CrewService(crewRepositoryMock, crewmanServiceMock);

	test('Should return a list of crews', async () => {

		crewRepositoryMock.findAll.mockResolvedValue(mockedCrews);

		const crews = await crewService.getCrews()

		expect(crewRepositoryMock.findAll).toHaveBeenCalledTimes(1);
		expect(crews).toEqual(mockedCrews);
	});

	test('Should return a specific crew', async () => {

		crewRepositoryMock.findById.mockResolvedValue(mockedCrew);

		const crewId = 1;
		const crew = await crewService.getCrew(crewId);

		expect(crewRepositoryMock.findById).toHaveBeenCalledTimes(1);
		expect(crewRepositoryMock.findById).toHaveBeenCalledWith(crewId);
		expect(crew).toEqual(mockedCrew);
	});

	test('Should return undefined because of a undefined crewId value', async () => {

		crewRepositoryMock.findById.mockResolvedValue(mockedCrew);

		const crewId = undefined;
		const crew = await crewService.getCrew(crewId);

		expect(crewRepositoryMock.findById).toHaveBeenCalledTimes(0);
		expect(crew).toEqual(undefined);
	});

	test('Should create a new crew', async () => {

		crewRepositoryMock.create.mockResolvedValue({ ...mockedCrew, id: 0 });
		crewmanServiceMock.getCrewmans.mockResolvedValue(mockedCrewmans);

		const crew = await crewService.createCrew(mockedCreateCrewDto);

		expect(crewRepositoryMock.create).toHaveBeenCalledTimes(1);
		expect(crewRepositoryMock.create).toHaveBeenCalledWith({ ...mockedCrew, id: 0 });
		expect(crew).toEqual({ ...mockedCrew, id: 0 });
	});

	test('Should delete a crew', async () => {

		crewRepositoryMock.delete.mockResolvedValue();

		const crewId = 1;
		const crew = await crewService.deleteCrew(crewId);

		expect(crewRepositoryMock.delete).toHaveBeenCalledTimes(1);
		expect(crewRepositoryMock.delete).toHaveBeenCalledWith(crewId);
		expect(crewRepositoryMock.delete).toHaveReturned();
		expect(crew).toBeUndefined();
	});
});