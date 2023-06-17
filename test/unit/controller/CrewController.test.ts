import { Request, Response } from 'express';
import { CrewController } from "../../../src/controller/CrewController";
import { CrewService } from "../../../src/service/CrewService";
import { mockedCrewDto, mockedCrewDtos } from '../../mocks/CrewMock';

jest.mock('../../../src/service/CrewService');

const CrewServiceMock = CrewService as jest.Mock<CrewService>;

describe('CrewController tests', () => {

	const crewServiceMock = new CrewServiceMock() as jest.Mocked<CrewService>;
	const crewController = new CrewController(crewServiceMock);

	test('Should return a list of crews', async () => {

		crewServiceMock.getCrews.mockResolvedValue(mockedCrewDtos);

		const crews = await crewController.getAll({} as Request, { json: () => { } } as Response)

		expect(crewServiceMock.getCrews).toHaveBeenCalledTimes(1);
		expect(crews).toEqual(mockedCrewDtos);
	});

	test('Should return a specific crew', async () => {

		const crewId = '1';
		const request = { params: { id: crewId } } as Request<{ id: string }>;

		crewServiceMock.getCrew.mockResolvedValue(mockedCrewDto);

		const crew = await crewController.get(request, { json: () => { } } as Response);

		expect(crewServiceMock.getCrew).toHaveBeenCalledTimes(1);
		expect(crewServiceMock.getCrew).toHaveBeenCalledWith(parseInt(crewId));
		expect(crew).toEqual(mockedCrewDto);
	});

	test('Should create a new crew', async () => {

		const crewId = '1';
		const request = { body: mockedCrewDto } as Request;

		crewServiceMock.createCrew.mockResolvedValue(mockedCrewDto);

		const crew = await crewController.create(request, { json: () => { } } as Response);

		expect(crewServiceMock.createCrew).toHaveBeenCalledTimes(1);
		expect(crewServiceMock.createCrew).toHaveBeenCalledWith(mockedCrewDto);
		expect(crew).toEqual(mockedCrewDto);
	});

	test('Should update a specific crew', async () => {

		const crewId = '1';
		const request = { params: { id: crewId }, body: mockedCrewDto } as Request<{ id: string }>;

		crewServiceMock.updateCrew.mockResolvedValue(mockedCrewDto);

		const crew = await crewController.update(request, { json: () => { } } as Response);

		expect(crewServiceMock.updateCrew).toHaveBeenCalledTimes(1);
		expect(crewServiceMock.updateCrew).toHaveBeenCalledWith(parseInt(crewId), mockedCrewDto);
		expect(crew).toEqual(mockedCrewDto);
	});

	test('Should delete a crew', async () => {

		const crewId = '1';
		const request = { params: { id: crewId } } as Request<{ id: string }>;

		crewServiceMock.deleteCrew.mockResolvedValue();

		const crew = await crewController.delete(request, { json: () => { } } as Response);

		expect(crewServiceMock.deleteCrew).toHaveBeenCalledTimes(1);
		expect(crewServiceMock.deleteCrew).toHaveBeenCalledWith(parseInt(crewId));
		expect(crewServiceMock.deleteCrew).toHaveReturned();
		expect(crew).toBeUndefined();
	});
});