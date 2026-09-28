import { Router } from "express";
import { authController } from "./auth.controller";

const router=Router();


//SingUp
router.post('/signup',authController.signUp)


export const authRoutes=router;