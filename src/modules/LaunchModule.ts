import { LaunchController } from "../controller/LaunchController";
import { LaunchRepository } from "../repository/LaunchRepository";
import { LaunchService } from "../service/LaunchService";
import { crewService } from "./CrewModule";
import { rocketService } from "./RocketModule";

const launchRepository = new LaunchRepository();
const launchService = new LaunchService(launchRepository, rocketService, crewService);
const launchController = new LaunchController(launchService);

export {
	launchRepository,
	launchService,
	launchController
};
