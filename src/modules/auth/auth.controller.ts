import { Request, Response } from "express"
import { authService } from "./auth.service"

const signUp= async(req:Request,res:Response)=>{
    try{
        const result = await authService.signUp(req.body);
        
        res.status(201).json({
            success:true,
            message:"User registered successfully.",
            data:result.rows[0],
            
        })

    }catch(err:any){
        return res.status(400).json({
            success:false,
            message:"Invalid Information",
            error:err.message
        })
    }
}

export const authController={
    signUp
}