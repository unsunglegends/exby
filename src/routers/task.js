const express = require('express')
const Task = require('../models/task')
const auth = require('../middleware/auth') 
const router = new express.Router()

router.post('/tasks',auth,async (req,res)=>{
    const task = new Task({
        ...req.body,
        'owner':req.user._id
    })
   
    try {
    await task.save()
    res.status(201).send(task)
    }
    catch(e){
       res.status(404).send(e)
    }
})

router.get('/tasks',auth,async (req,res)=>{
    
    try{
    const task = await Task.find({owner:req.user._id})
    console.log(req.token)
    res.send(task)

    }catch(e){
        res.status(500).send()
    }
})
router.get('/tasks/:id',auth,async (req,res)=>{
    const _id=req.params.id
    
    try{
    const task = await Task.findOne({_id,owner:req.user._id})
    if(!task){
        res.status(404).send()
    }
    res.send(task)
    }catch(e){
        res.status(500).send()
    }

})

router.patch('/tasks/:id', auth,async(req,res)=>{
    const _id = req.params.id
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description','completed']
    const isValidOperation = updates.every((update)=>allowedUpdates.includes(update))
    if(!isValidOperation){
        return res.status(400).send('invalid update')
    }
    try{
       /*  const task = await Task.findById(_id) */
       const task = await Task.findOne({_id,owner:req.user._id})
       if (!task){
        return res.status(404).send('task not found')
    }
        updates.forEach((update)=>{
            task[update]=req.body[update]

        })
        await task.save()
        //const task = await Task.findByIdAndUpdate(_id,req.body,{new:true,runValidators:true})
        
        res.send(task)
    }
    catch(e)
    {
        res.status(400).send(e)
    }
})

router.delete('/tasks/:id',auth, async (req,res)=>{
    const _id=req.params.id
    try{
        /* const task = await Task.findByIdAndDelete(_id) */
        const task = await Task.findOneAndDelete({_id,owner:req.user._id})
        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    }
    catch(e){
        res.status(500).send(e)
    }
})
module.exports = router