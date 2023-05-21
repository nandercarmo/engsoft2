import { Router } from "express";

import { createLaunch, deleteLaunch, getLaunch, getLaunchs, updateLaunch } from "../../controller/LaunchController";

const router = Router();

router.get('/', getLaunchs);
router.get('/:id', getLaunch);
router.post('/', createLaunch);
router.put('/:id', updateLaunch);
router.delete('/:id', deleteLaunch);

export {
	router as LaunchRouter
};
