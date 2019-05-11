const express = require('express')
 
const app = express()
const port = process.env.PORT || 2019
app.use(express.json())
app.post('/subscription/planthealth',(req,res)=>{
    const test = req.path.split('/')
    console.log(test[2])
    const jwt = require('jsonwebtoken')
    const token=jwt.sign({_id:'56669875625562',service:"planthealth"},'thisismynewcourse',{ expiresIn: '1h' })
    const decoded = jwt.verify(token,'thisismynewcourse')
    
    
    console.log(decoded._id,decoded.service)
    if (decoded.service !== test[2]){
       console.log('planth')
       res.send("error")
    }
   res.send(req.body)
})
app.listen(port,()=>{
    console.log('server on port %s',port)

}) 