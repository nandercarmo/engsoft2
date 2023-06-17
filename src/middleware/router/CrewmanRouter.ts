import { Router } from "express";
import { crewmanController } from "../../modules/CrewmanModule";

const router = Router();

router.get('/', crewmanController.getAll.bind(crewmanController));
router.get('/:id', crewmanController.get.bind(crewmanController));
router.post('/', crewmanController.create.bind(crewmanController));
router.put('/:id', crewmanController.update.bind(crewmanController));
router.delete('/:id', crewmanController.delete.bind(crewmanController));

export {
	router as CrewmanRouter
};
