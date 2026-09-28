import { Router } from "express";
import { authController } from "./auth.controller";

const router = Router();


//SingUp
router.post('/signup', authController.signUp)

//SignIn
router.post('/signin', authController.signIn);


export const authRoutes = router;