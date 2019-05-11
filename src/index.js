const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task') 
const app = express()
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
const port = process.env.PORT || 2019
/* app.use((req,res,next)=>{
    if (req.method === 'GET'){
        res.send('get not found')
    }else{
        next()
    }
    
}) */
/* app.use((req,res,next)=>{
    res.status(503).send({error:'site is under maintaince'})
}) */
app.use(express.json())
app.use(userRouter)
app.use(taskRouter)



app.listen(port,()=>{
    console.log('server on port %s',port)

}) 


/* const jwt = require('jsonwebtoken')
const myfunction = async ()=>{
 const token = 'n6hqwRTbbcsAvZHyYC9ahMyMXfWr2c2S7Tgncrj6avgf3xD9Yylp4relqapv24QUH8Np2eh1VfvgoloKy9vRCLtG2NJGZyIubIFkfpaltJb6ajCoBAu1nCX5HUZJNlWUDQiwBjh7LiMIJ1CKvrrvKIKabquSd3g4KfY50ns9o4sBlTHbPKoOGKK8yYRGiBR7rI4NkQ7Vm0N3xkb9vUUvhe8qd8VdpWCvSdJlxvT6GUbIMahD7lrJEcNayHgjSOEz'
 console.log(token)
 const data = jwt.verify(token,'quod recusandae rerum tempore veniam!')
 console.log(data)

}
myfunction()

const main = async () =>{
    const task = await Task.findById('5ca13b3353b24636f41c4dee')
    await task.populate('owner').execPopulate()
    
    const user = await User.findById('5ca13b1f53b24636f41c4dec')
    await user.populate('tasks').execPopulate()
    console.log(user.tasks)
}
main() */