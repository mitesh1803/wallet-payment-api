import dotenv from 'dotenv'
dotenv.config()

import connectDB from './config/db.js'
import express from 'express'
import cors from 'cors'
import authRoutes from './routes/auth.js'
import userRoutes from './routes/user.js'
import transactionRoutes from './routes/transaction.js'

const app =express();
//connect db
connectDB()


app.use(cors())
app.use(express.json());

// app.get("/",(req,res)=>{
//     res.sendFile(__dirname+"/public/")
// })

//routes
app.use('/auth', authRoutes)
app.use('/user', userRoutes)
app.use('/transaction', transactionRoutes)

app.listen(3000,()=> console.log("Server running on port 3000"))