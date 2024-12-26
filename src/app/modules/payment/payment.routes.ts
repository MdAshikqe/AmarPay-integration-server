import { Router } from "express";
import { paymentcontroller } from "./payment.controller";

const router= Router();

router.post("/confirmaton", paymentcontroller.confirmationController)

export const paymentRoutes = router;