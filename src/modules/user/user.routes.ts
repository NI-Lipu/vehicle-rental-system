import { Router } from "express";
import { userController } from "./user.controller";
import auth from "../../middleware/auth";

const router = Router();

//Get all users
router.get('/', auth('admin'), userController.getAllUsers);

//Update users
router.put('/:userId', auth('admin', 'customer'), userController.updateUsers)

export const userRouter = router;