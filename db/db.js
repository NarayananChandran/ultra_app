const mongoose = require('mongoose')

mongoose.connect("mongodb://mongod-server:"+process.env.MONGO_PORT+"/my_db", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})
