import bcrypt from "bcryptjs";
import { pool } from "../../config/db";
import config from "../../config";
import jwt from "jsonwebtoken";

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

//SignIn Users
const signIn = async (email: string, password: string) => {
    const result = await pool.query(
        `
        SELECT * FROM users
        WHERE email=$1`,
        [email],
    );
    if ((result.rowCount === 0)) {
        throw new Error("Invalid email of password");
    };

    const { id, name, email: userEmail, phone, role, password: hashedPassword } = result.rows[0];

    //Check password
    const isMatched = await bcrypt.compare(password, hashedPassword);

    if (!isMatched) {
        throw new Error("Invalid email of password")
    };

    const token = jwt.sign(
        { id: id, name: name, email: userEmail, role: role },
        config.jwt_secret as string,
        { expiresIn: "30d" },
    );
    return {
        token,
        user: {
            id, name, email: userEmail, phone, role
        }
    }
};

export const authService = {
    signUp,
    signIn
};
