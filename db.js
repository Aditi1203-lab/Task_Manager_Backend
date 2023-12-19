const { default: mongoose } = require('mongoose');
const moongose=require('moongose')
require('dotenv').config();
const MONGO_URL=process.env.MONGO_URL
const DB_NAME=process.env.DB_NAME
//connecting nodejs with mongodb
mongoose.connect(MONGO_URL,{
    dbName:DB_NAME
}).then(()=>{
    console.log("Connection successful")
}).catch((err)=>{
    console.log('error in connecting '+err)
})