import dotenv from 'dotenv';

dotenv.config();

const config={
    port:Number(process.env.PORT) || 5000,
    connection_str:process.env.CONNECTION_STR,
    jwt_secret:process.env.JWT_SECRET

}
export default config;