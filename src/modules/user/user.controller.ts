import { Request, Response } from "express";
import { userService } from "./user.service";

//Get all users
const getAllUsers = async (req: Request, res: Response) => {
    try {
        const result = await userService.getAllUsers();

        if (result.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No user found'
            })
        }

        return res.status(200).json({
            success: true,
            message: "Users retrieved successfully",
            data: result,
        })


    } catch (err: any) {

        return res.status(500).json({
            success: false,
            message: err.message,
        })

    }
}

export const userController = {
    getAllUsers,

}