import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";

const auth = (...roles: string[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const authHeader = req.headers.authorization;


            if (!authHeader) {
                return res.status(401).json({
                    success: false,
                    message: "You are not allowed"
                })
            }

            const token = authHeader.split(" ")[1];

            if (!token) {
                return res.status(401).json({
                    success: false,
                    message: "Invalid authorization format",
                });
            }

            const decode = jwt.verify(token as string, config.jwt_secret as string) as JwtPayload;

            req.user = decode;
            // console.log(decode);

            if (roles.length && !roles.includes(decode.role)) {
                return res.status(403).json({
                    success: false,
                    message: "You are not authorized to access this resource."
                })
            }

            next();
        } catch (err: any) {
            res.status(401).json({
                success: false,
                message: err.message,
            })
        }
    }
}

export default auth;