require('../src/db/mongoose')
const User = require('../src/models/user')
const Task = require('../src/models/task')
/* User.findByIdAndUpdate('5c951b64b776c708ec28878f',{age:20}).then((user)=>{
    console.log(user)
    return User.countDocuments({age:20})
}).then((result)=>{
    console.log(result)
}).catch((e)=>{
    console.log(e)
})
 */
/* Task.findByIdAndDelete('5c950a7c50d3f24f95911d88').then((user)=>{
    console.log(user)
    return Task.countDocuments({compleated:false})
}).then((result)=>{
    console.log(result)
}).catch((e)=>{
    console.log(e)
}) */
/* const updateAndCount = async (id,age)=>{
    const update = await User.findByIdAndUpdate(id,{age})
    const count = await User.countDocuments({age})
    return count
}

updateAndCount('5c951b66b776c708ec288791',10).then((result)=>{
    console.log(result)
}).catch((e)=>{
    console.log(e)
}) */
const deleteAndCount = async (id,status) => {
    const delete1 = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({compleated:status})
    return count
}

deleteAndCount('5c9514289e6b9b739d0e30a3', false).then((result)=>{
    console.log(result)
}).catch((e)=>{
    console.log(e)
})