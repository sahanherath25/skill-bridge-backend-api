const mongoose=require("mongoose");
const dotenv = require('dotenv');
const client=require("./redisClient");

require("./services/cache");
const app=require('./app');

// const onCloudNine=require("./onCloudNine")
// const msg=require("./sahan")

dotenv.config({
    path: `./config.env`,
});


const mongoDBURI= process.env.MONGODB_URI_LOCAL.replace("<PASSWORD>", process.env.PASSWORD)
// client.connect(

mongoose.connect(mongoDBURI).then(()=>{
    console.log("Connected successfully")
}).catch(()=>{
    console.log("Error")
})

app.listen(3001,()=>{
    console.log('Server started on port 3000');
})




