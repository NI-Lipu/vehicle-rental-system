import { pool } from "../../config/db"

//Get all users
const getAllUsers = async () => {
    const result = await pool.query(`
        SELECT id, name, email, phone, role FROM users`);
    return result.rows;
}

//Update users
const UpdateUsers = async (payload: Record<string, unknown>, id: string, user: any) => {

    const { name, email, phone, role } = payload

    const findUser = await pool.query(`SELECT id FROM users WHERE id=$1`, [id])

    if (findUser.rowCount !== 1) {
        throw new Error('No user found');
    }

    //Customer Update logic
    if (user.role === 'customer') {
        if (findUser.rows[0].id !== user.id) {
            throw new Error('Unauthorized update request');
        }

        const result = await pool.query(`
            UPDATE users
            SET name = $1, email = $2, phone = $3, role = $4
            WHERE id = $5
            RETURNING id, name, email, phone, role
            `, [name, email, phone, role, id])

        return result.rows[0];
    }

    //Admin Update logic
    if (user.role === 'admin') {
        const result = await pool.query(`
            UPDATE users
            SET name = $1, email = $2, phone = $3, role = $4
            WHERE id = $5
            RETURNING id, name, email, phone, role
            `, [name, email, phone, role, id]);

        return result.rows[0];
    }

}

//Delete users
const deleteUsers = async (id:string, user:any)=>{
    
 const result = await pool.query(`DELETE FROM users WHERE id=$1`,[id])
 if(result.rowCount !==1){
    throw new Error("User not exist")
 }
 return result;

}

export const userService = {
    getAllUsers,
    UpdateUsers,
    deleteUsers

}