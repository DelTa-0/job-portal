import dotenv from 'dotenv'
dotenv.config()
export const JWT_CONFIG={
    SECRET:process.env.SECRET
}