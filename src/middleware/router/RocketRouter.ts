import { Router } from "express";
import { rocketController } from "../../modules/RocketModule";

const router = Router();

router.get('/', rocketController.getAll.bind(rocketController));
router.get('/:id', rocketController.get.bind(rocketController));
router.post('/', rocketController.create.bind(rocketController));
router.put('/:id', rocketController.update.bind(rocketController));
router.delete('/:id', rocketController.delete.bind(rocketController));

export {
	router as RocketRouter
};
