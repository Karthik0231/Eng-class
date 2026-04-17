import express from 'express'
import mongoConnection from './db.js'
import cors from 'cors'
import dotenv from 'dotenv'
import userRoutes from './routes/authRoutes.js'
import cookieParser from 'cookie-parser'
import postRoutes from './routes/postRoutes.js'

dotenv.config()

const app = express()
app.use(express.json()) 

mongoConnection();
app.use(cookieParser())
app.use(cors({
    origin:['https://sc-frontend-phi.vercel.app/','http://localhost:5173', 'http://localhost:5174'],
    credentials:true
}))

const PORT = process.env.PORT

//test Api(optional)
app.get("/test",(req,res)=>{
    res.send("hello world")
})

app.use('/auth',userRoutes)
app.use('/post', postRoutes)
app.use('/uploads', express.static('uploads'))
 
app.listen(PORT,()=>{
    console.log("My new server running on "+PORT)
})

