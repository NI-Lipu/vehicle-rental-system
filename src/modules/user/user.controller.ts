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

//Update users
const updateUsers = async (req: Request, res: Response) => {
    const id = req.params.userId;
    try {
        const result = await userService.UpdateUsers(req.body, id as string, req.user)

        return res.status(200).json({
            success: true,
            message: 'User update successfully',
            data: result
        })
    } catch (err: any) {
        return res.status(400).json({
            success: false,
            message: err.message
        })
    }
}

//Delete user
const deleteUsers = async (req: Request, res: Response) => {
    const id = req.params.userId;
    try {
        const result = await userService.deleteUsers(id as string, req.user);

        return res.status(200).json({
            success: true,
            message: 'User deleted successfully',
        })
    } catch (err: any) {
        return res.status(400).json({
            success: false,
            dd:'kkk',
            message: err.message
        })
    }
}

export const userController = {
    getAllUsers,
    updateUsers,
    deleteUsers

}