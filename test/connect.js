

// Initial Setup for the Test
const mongoose = require('mongoose')
const dotdev = require('dotenv')
const User=require("../models/userSchema");

dotdev.config({
    path: "./config.env"
})

// TODO Connect to the Database
const mongoDBUri = process.env.MONGODB_URI.replace("<PASSWORD>", process.env.PASSWORD)

// console.log(mongoDBUri)


before( async () => {

    try {
        const db=await mongoose.connect(mongoDBUri)
        console.log("Connected successfully")
    } catch (e) {
        console.log("Error ", e)
    }

})

after( async () => {

    const userDeleted=await mongoose.connection.collections.students.drop();
    // const deletingUser=await User.deleteOne({name:"Sahan Udara"})
    // console.log("USER IS DELETED BEFORE TEST SHUT DOWN",userDeleted)

    mongoose.disconnect()
})

// beforeEach(async () => {
//
//     const userDeleted=await mongoose.connection.collections.students.drop();
//
//     console.log("USERS IS DELETED SCUESSFULLY" ,userDeleted)
//
// })


