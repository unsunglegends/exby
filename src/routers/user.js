const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/users',async (req,res)=>{
    const user = new User(req.body)
    
    try{
        const token =await user.generateAuthToken()
        await user.save()
        res.status(201).send({user,token})
    }catch(e){
        res.status(404).send(e)
    }
})
router.post('/users/login',async(req,res)=>{
    try{
    const user = await User.findByCredentials(req.body.email,req.body.password)
    const token = await user.generateAuthToken() 
    res.send({user,token})
    }
    catch(error){
        res.status(400).send(error)
    }
})
router.get('/users/me',auth,async (req,res)=>{
    res.send(req.user)
})

router.get('/username/:name',async (req,res)=>{
     const name = req.params.name
     
     try{
     const user =  await User.findOne({name})
     if(!user){
        res.status(404).send()
     }
     res.send(user) 
    }catch(e){
        res.status(500).send()
    }
})
router.post("/users/logout",auth,async (req,res)=>{
    try{
       
    req.user.tokens = req.user.tokens.filter((token)=>{
        console.log('user:',token.token)
        console.log('root:',req.token)
        return token.token !== req.token
    })
    const user1 = await req.user.save()
    res.send(user1)

    }
    catch(e){
     res.status(500).send(e)
    }
})
router.post("/users/logout/all",auth,async (req,res)=>{
    try{
       
    req.user.tokens = []
    const user1 = await req.user.save()
    res.send(user1)

    }
    catch(e){
     res.status(500).send(e)
    }
})
router.patch('/users/me',auth,async (req,res)=>{
    const user=req.user
    const updates = Object.keys(req.body)
    const allowedUpdates=['name','email','password','age']
    const isValidOperation = updates.every((update)=> allowedUpdates.includes(update))
    if(!isValidOperation){
      return res.status(404).send('invalid update')
    }
    try{
        /*  const user = await User.findById(_id) */
         updates.forEach((update)=> user[update] = req.body[update])
         await user.save()
         res.send(user)
    }catch(e){
        res.status(400).send(e)
    }
})
router.delete('/users/me',auth,async (req,res)=>{
    
    try{
       /* const user = await User.findByIdAndDelete(_id)
       if (!user){
           return res.status(404).send()
       } */
       await req.user.remove()
       res.send(req.user)
    }
    catch(e)
    {
       res.status(500).send(e)
    }

})
router.get('/fruit/:fruitName/:fruitColor', function(req, res) {
    var data = {
        "fruit": {
            "apple": req.params.fruitName,
            "color": req.params.fruitColor
        }
    }; 

    res.send(data);
});

module.exports = router