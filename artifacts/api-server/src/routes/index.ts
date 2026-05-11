import { Router, type IRouter } from "express";
import healthRouter from "./health";
import storageRouter from "./storage";
import adminAuthRouter from "./admin/auth";
import eventsRouter from "./events";
import committeeRouter from "./committee";

const router: IRouter = Router();

router.use(healthRouter);
router.use(storageRouter);
router.use(adminAuthRouter);
router.use(eventsRouter);
router.use(committeeRouter);

export default router;
