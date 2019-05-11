const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/exby',{
    useNewUrlParser: true,
    useCreateIndex:true
})
