const express=require('express')
const cors=require('cors')
const cookieParser=require('cookie-parser')
const app=express()
app.use(cors({
    origin: ['http://localhost:5173'],
    method:["POST","GET"],
    credentials:true
}))
app.use(express.json())
app.use(cookieParser())
app.use(express.static('public'))
app.use('/api',require('./routes/userRoute'))
app.use('/api/admin',require('./routes/adminRoute'))
app.listen(3000)