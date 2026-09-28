import { Request, Response } from "express"
import { authService } from "./auth.service"

const signUp = async (req: Request, res: Response) => {
    try {
        const result = await authService.signUp(req.body);

        res.status(201).json({
            success: true,
            message: "User registered successfully.",
            data: result.rows[0],

        })

    } catch (err: any) {
        return res.status(400).json({
            success: false,
            message: "Invalid Information",
            error: err.message
        })
    }
}

const signIn = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and Password are required",
            })
        }

        const result = await authService.signIn(email, password);

        return res.status(200).json({
            success: true,
            message: 'Login successful',
            data: result
        })

    } catch (err: any) {
        return res.status(401).json({
            success: false,
            message: err.message,
        })
    }
}

export const authController = {
    signUp,
    signIn
}