const mongoose=require('mongoose')
const bcrypt=require('bcrypt')
const taskSchema=new mongoose.Schema({
   title:{
    type:String,
    required:true
   },
   description:{
    type:String,
    required:true
   },
   completed:{
    type:String,
    required:false
   },
   owner:{ //stroing owner of that task ie storing unique id of user generated earlier ie _id
    type:mongoose.Schema.Types.ObjectID, //unique id provided by mongodb
    required:true,
    ref:'User'   
}
});
// userSchema.pre('save',async function(next){
//     const user=this;
//     if(user.isModified('password')){
//       user.password=await bcrypt.hash(user.password,8);
//     }
//     next();
// })
const Task=mongoose.model('Task',taskSchema)
module.exports=Task;