import bcrypt from "bcryptjs";
import { pool } from "../../config/db";

//SignUp Users
const signUp = async (payload: Record<string, unknown>) => {
    const { name, email, password, phone, role } = payload;

    //Password Validation
    if (typeof password !== "string" || password.length < 6) {
        throw new Error("Password must be more than or equal 6 characters");
    }
    
    //Email validation
    const normalizedEmail = (email as string).trim().toLowerCase();

    //Password Hashing
    const hashedPassword = await bcrypt.hash(password as string, 10);

    const result = await pool.query(
        `INSERT INTO users(name, email, password, phone, role)
        VALUES($1, $2, $3, $4, $5)
        RETURNING id,name,email,phone,role`,
        [name, normalizedEmail, hashedPassword, phone, role],
    );
    return result;
};

export const authService = {
    signUp,
};
