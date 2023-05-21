import { Router } from "express";

import { createCrewman, deleteCrewman, getCrewman, getCrewmans, updateCrewman } from "../../controller/CrewmanController";

const router = Router();

router.get('/', getCrewmans);
router.get('/:id', getCrewman);
router.post('/', createCrewman);
router.put('/:id', updateCrewman);
router.delete('/:id', deleteCrewman);

export {
	router as CrewmanRouter
};
