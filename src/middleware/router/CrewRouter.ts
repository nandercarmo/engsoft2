import { Router } from "express";

import { createCrew, deleteCrew, getCrew, getCrews, updateCrew } from "../../controller/CrewController";

const router = Router();

router.get('/', getCrews);
router.get('/:id', getCrew);
router.post('/', createCrew);
router.put('/:id', updateCrew);
router.delete('/:id', deleteCrew);

export {
	router as CrewRouter
};
