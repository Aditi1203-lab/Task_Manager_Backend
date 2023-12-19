const express=require('express')
const bodyParser=require('body-parser')
const app=express();
const userRoutes=require('./routes/userRoutes')
const taskroutes=require('./routes/taskroutes')
require('./db')
require('dotenv').config();
const PORT=process.env.PORT||3000;

app.use(bodyParser.json());
app.use('/users',userRoutes);
app.use('/tasks',taskroutes)
app.get('',(req,res)=>{
    res.json({
        message:'This is mt app'
    })
})
app.listen(PORT,()=>{
    console.log(`server running on port: ${PORT}`);
})