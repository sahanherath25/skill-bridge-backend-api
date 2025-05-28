

// Initial Setup for the Test
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const User=require("../models/userSchema");

dotenv.config({
    path: "./config.env"
})

// TODO Connect to the Database
// const mongoDBUri = process.env.MONGODB_URI_LOCAL.replace("<PASSWORD>", process.env.PASSWORD)
const mongoDBUri = process.env.MONGODB_URI

// console.log(mongoDBUri)
console.log('MONGODB_URI from process.env:', process.env.MONGODB_URI);

before( async () => {

    try {
        const db=await mongoose.connect(mongoDBUri)
        console.log("Connected successfully DB")
    } catch (e) {
        console.log("Error ", e)
    }

})

after( async () => {

    // TODO Get All the  Collections

    const{students,comments,blogposts}=mongoose.connection.collections



    const student=await mongoose.connection.collections.students.drop();
    const comment=await mongoose.connection.collections.comments.drop();
    const blog=await mongoose.connection.collections.blogposts.drop();

    // const userDeleted=await mongoose.connection.collections.students.drop();
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


