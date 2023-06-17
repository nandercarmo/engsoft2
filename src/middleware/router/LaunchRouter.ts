import { Router } from "express";
import { launchController } from "../../modules/LaunchModule";

const router = Router();

router.get('/', launchController.getAll.bind(launchController));
router.get('/:id', launchController.get.bind(launchController));
router.post('/', launchController.create.bind(launchController));
router.put('/:id', launchController.update.bind(launchController));
router.delete('/:id', launchController.delete.bind(launchController));

export {
	router as LaunchRouter
};
