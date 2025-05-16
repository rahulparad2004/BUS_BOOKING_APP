import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import connectDB from './config/connect.js'
import {PORT} from './config/config.js'
import userRouter from './routes/user.js'
import busRouter from './routes/bus.js'
import ticketRouter from './routes/ticket.js'
import { buildAdminJs } from './config/setup.js'

dotenv.config()

const app = express()

const corsOptions = {
    origin:'*',
    method:['GET','POST','PUT','DELETE','PATCH'],
    allowedHeaders:['content-type','Authorization']
}

app.use(cors(corsOptions))

app.use(express.json())

//Routes
app.use("/user",userRouter);
app.use("/bus",busRouter);
app.use("/ticket",ticketRouter);


const start = async()=>{
    try {
        await connectDB(process.env.MONGO_URI)
        await buildAdminJs(app)
        app.listen({port:PORT,host:'0.0.0.0'},(err,addr)=>{
            if(err){
                console.log(err)
            }else{
                console.log(`Server started on http://localhost:${PORT}`)
            }
        })
    } catch (error) {
        console.log("Error Starting Server-->",error)
    }
}

start()