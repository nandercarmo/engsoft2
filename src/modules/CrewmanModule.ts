import { CrewmanController } from "../controller/CrewmanController";
import { CrewmanRepository } from "../repository/CrewmanRepository";
import { CrewmanService } from "../service/CrewmanService";

const crewmanRepository = new CrewmanRepository();
const crewmanService = new CrewmanService(crewmanRepository);
const crewmanController = new CrewmanController(crewmanService);

export {
	crewmanRepository,
	crewmanService,
	crewmanController
};
