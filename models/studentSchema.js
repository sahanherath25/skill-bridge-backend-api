const mongoose = require('mongoose');
const Schema=mongoose.Schema
const PostSchema=require("../models/postSchema");

const StudentSchema=new Schema({

    name: {
        type: String,
        required: [true,"name is required"],
        validate:{
            validator:function(name){
                // return /^[a-z0-9]+$/.test(name);
                return name.length>2
            },
            message:"Name must be longer than 2 Characters"
        }
    },
    age:{
        type: Number,
        required: [true,"age is required"],
    },
    posts:[PostSchema],
    likes:Number

})

StudentSchema.virtual('postCount').get(function(){
    return this.posts.length;
})
const Student=mongoose.model("student",StudentSchema)
module.exports=Student;






