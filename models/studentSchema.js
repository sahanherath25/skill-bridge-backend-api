const mongoose = require('mongoose');
const Schema=mongoose.Schema
const PostSchema=require("../models/postSchema");
const BlogPost=require("../models/blogPostSchema");

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
    likes:Number,
    blogPosts:[{
        type:Schema.Types.ObjectId,
        ref:"blogPost",
    }]

})



StudentSchema.virtual('postCount').get(function(){
    return this.posts.length;
})

StudentSchema.pre("deleteOne",{ document: true },async function(){

    console.log("MIDDLEWARE EXTECUTED")

    // Here if user is deleted we dont need to keel that user's
    // blogPosts data in our blogposts collection

    // TODO Getting the BlogPost collection
    const BlogPost=mongoose.model("blogPost")

    console.log("Collections Foudn",)

    // Remove the BlogPost object if it include the current document blogPosts
   const deletedCollection= await BlogPost.deleteMany({_id:{$in:this.blogPosts}})

    let blogs=await BlogPost.deleteMany({_id:this.blogPosts})
    console.log(`${deletedCollection.deletedCount} blog posts deleted`);


})



const Student=mongoose.model("student",StudentSchema)
module.exports=Student;






