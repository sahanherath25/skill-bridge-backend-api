const express=require("express");
const cors=require("cors");
const app=express();
const userRouter=require("./routes/userROuter");
const User=require("./models/userSchema");
const {clearHash}=require("./services/cache")

//
async function createNewUser(){

    const userId=2525
    // const newUser=await User.create({name:"Emma",age:27})

    clearHash(userId)

    const user=await User.find().cache({key:userId});
    console.log("USER FOUDN IS ",user)
}

//
//
//
createNewUser()

// User.findOne().then(({{name:"Abigirl",age:27})=>{
//     console.log("USER FOUND ",user);
// })
//
// User.find().then((user)=>{
//     console.log("USER FOUND ",user);
// })
//
// User.findOne({name:"Abigirl",age:27}).then((user)=>{
//     console.log("USER FOUND ",user);
// })







app.use(express.json());
app.use(cors());

app.use("/users",userRouter)




module.exports=app