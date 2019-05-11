const mongoose = require('mongoose')
const TaskSchema = mongoose.Schema({
    description:{
        type:String,
        required:true,
        trim:true
    },
    completed:{
        type:Boolean,
        default:false
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    }
})
TaskSchema.pre('save',async function(next){
    const task = this
    console.log(task)
    console.log('%s has been updated',task._id) 
    
    next()
} )
const Task = mongoose.model('Task',TaskSchema)

module.exports=Task