import { Request, Response } from 'express';
import { CrewmanController } from "../../../src/controller/CrewmanController";
import { CrewmanService } from "../../../src/service/CrewmanService";
import { mockedCrewmanDto, mockedCrewmanDtos } from '../../mocks/CrewmanMock';

jest.mock('../../../src/service/CrewmanService');

const CrewmanServiceMock = CrewmanService as jest.Mock<CrewmanService>;

describe('CrewmanController tests', () => {

	const crewmanServiceMock = new CrewmanServiceMock() as jest.Mocked<CrewmanService>;
	const crewmanController = new CrewmanController(crewmanServiceMock);

	test('Should return a list of crewmans', async () => {

		crewmanServiceMock.getCrewmans.mockResolvedValue(mockedCrewmanDtos);

		const crewmans = await crewmanController.getAll({} as Request, { json: () => { } } as Response)

		expect(crewmanServiceMock.getCrewmans).toHaveBeenCalledTimes(1);
		expect(crewmans).toEqual(mockedCrewmanDtos);
	});

	test('Should return a specific crewman', async () => {

		const crewmanId = '1';
		const request = { params: { id: crewmanId } } as Request<{ id: string }>;

		crewmanServiceMock.getCrewman.mockResolvedValue(mockedCrewmanDto);

		const crewman = await crewmanController.get(request, { json: () => { } } as Response);

		expect(crewmanServiceMock.getCrewman).toHaveBeenCalledTimes(1);
		expect(crewmanServiceMock.getCrewman).toHaveBeenCalledWith(parseInt(crewmanId));
		expect(crewman).toEqual(mockedCrewmanDto);
	});

	test('Should create a new crewman', async () => {

		const crewmanId = '1';
		const request = { body: mockedCrewmanDto } as Request;

		crewmanServiceMock.createCrewman.mockResolvedValue(mockedCrewmanDto);

		const crewman = await crewmanController.create(request, { json: () => { } } as Response);

		expect(crewmanServiceMock.createCrewman).toHaveBeenCalledTimes(1);
		expect(crewmanServiceMock.createCrewman).toHaveBeenCalledWith(mockedCrewmanDto);
		expect(crewman).toEqual(mockedCrewmanDto);
	});

	test('Should update a specific crewman', async () => {

		const crewmanId = '1';
		const request = { params: { id: crewmanId }, body: mockedCrewmanDto } as Request<{ id: string }>;

		crewmanServiceMock.updateCrewman.mockResolvedValue(mockedCrewmanDto);

		const crewman = await crewmanController.update(request, { json: () => { } } as Response);

		expect(crewmanServiceMock.updateCrewman).toHaveBeenCalledTimes(1);
		expect(crewmanServiceMock.updateCrewman).toHaveBeenCalledWith(parseInt(crewmanId), mockedCrewmanDto);
		expect(crewman).toEqual(mockedCrewmanDto);
	});

	test('Should delete a crewman', async () => {

		const crewmanId = '1';
		const request = { params: { id: crewmanId } } as Request<{ id: string }>;

		crewmanServiceMock.deleteCrewman.mockResolvedValue();

		const crewman = await crewmanController.delete(request, { json: () => { } } as Response);

		expect(crewmanServiceMock.deleteCrewman).toHaveBeenCalledTimes(1);
		expect(crewmanServiceMock.deleteCrewman).toHaveBeenCalledWith(parseInt(crewmanId));
		expect(crewmanServiceMock.deleteCrewman).toHaveReturned();
		expect(crewman).toBeUndefined();
	});
});