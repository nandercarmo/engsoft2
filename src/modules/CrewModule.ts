import { CrewController } from "../controller/CrewController";
import { CrewRepository } from "../repository/CrewRepository";
import { CrewService } from "../service/CrewService";
import { crewmanService } from "./CrewmanModule";

const crewRepository = new CrewRepository();
const crewService = new CrewService(crewRepository, crewmanService);
const crewController = new CrewController(crewService);

export {
	crewRepository,
	crewService,
	crewController
};
