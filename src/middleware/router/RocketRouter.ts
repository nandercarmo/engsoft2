import { Router } from "express";

import { createRocket, deleteRocket, getRocket, getRockets, updateRocket } from "../../controller/RocketController";

const router = Router();

router.get('/', getRockets);
router.get('/:id', getRocket);
router.post('/', createRocket);
router.put('/:id', updateRocket);
router.delete('/:id', deleteRocket);

export {
	router as RocketRouter
};
