const express=require('express')
const router=express.Router();
const auth=require('../middleware/auth')
const Task=require('../models/task')
router.get('/test',auth,(req,res)=>{
    res.json({
        message:'Task Routes',
        user:req.user
    })
}) 
//creating a task
router.post('/createtask',auth,async (req,res)=>{
    try{
        //title , description from req.body
        //owner:req.user._id
        const task=new Task({
            ...req.body,
            owner:req.user._id
        })
        await task.save();
        res.status(201).json({task,messsage:'Task created successfully'})
    }
    catch(err){
        res.status(400).send('Provide title and description')
    }
})
//get user task
router.get('/gettasks',auth,async (req,res)=>{
    try{//return all tasks with same user id
        const tasks=await Task.find({
            owner:req.user._id
        })
       res.status(200).json({tasks,count:tasks.length,message:'Tasks fetched successfully'})
    }catch(err){
        res.status(500).send({err:err.message})
    }
})

//update - this is a patch request
router.patch('/updatetasks/:id',auth,async (req,res)=>{
    const updates=Object.keys(req.body);
    const allowedupdates=['title','description','completed']
    const isvalidoperation=updates.every(update=>allowedupdates.includes(update));
    if(!isvalidoperation){
        return res.status(400).json({error:'Invalid updates'})
    }
    try{
        const task=await Task.findOne({
            _id:req.params.id,
            owner:req.user._id
        })
        if(!task){
            return res.send(404).json({message:'Task not found'})
        }
        updates.forEach(update=>task[update]=req.body[update])
        await task.save();
        res.json({
            message:'Task updated successfully'
        })
    }catch(err)
    {
      res.status(500).json({err})
    }
})
//delete a task
router.delete('/deletetasks/:id',auth,async (req,res)=>{
    const updates=Object.keys(req.body);
    const allowedupdates=['title','description','completed']
    const isvalidoperation=updates.every(update=>allowedupdates.includes(update));
    if(!isvalidoperation){
        return res.status(400).json({error:'Invalid updates'})
    }
    try{
        const task=await Task.findOneAndDelete({
            _id:req.params.id,
            owner:req.user._id
        })
        if(!task){
            return res.send(404).json({message:'Task not found'})
        }
        updates.forEach(update=>task[update]=req.body[update])
        await task.save();
        res.json({
            message:'Task deleted successfully'
        })
    }catch(err)
    {
      res.status(500).json({err})
    }
})
module.exports=router;