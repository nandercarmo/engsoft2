import { Router } from "express";
import { crewController } from "../../modules/CrewModule";

const router = Router();

router.get('/', crewController.getAll.bind(crewController));
router.get('/:id', crewController.get.bind(crewController));
router.post('/', crewController.create.bind(crewController));
router.put('/:id', crewController.update.bind(crewController));
router.delete('/:id', crewController.delete.bind(crewController));

export {
	router as CrewRouter
};
