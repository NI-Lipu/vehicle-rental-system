import { Pool } from "pg";
import config from ".";

const pool = new Pool({
    connectionString: `${config.connection_str}`,
});

const initDB = async () => {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS Users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password TEXT NOT NULL,
        phone VARCHAR(20) NOT NULL,
        role VARCHAR(20) NOT NULL DEFAULT 'customer',
        create_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()

        CONSTRAINT users_role_check
            CHECK(ROLE IN('admin', 'customer'))

        )
        `);
};

export default initDB;
