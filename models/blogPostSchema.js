const mongoose = require('mongoose');
const Schema=mongoose.Schema

const BlogPostSchema=new Schema({

    title: {
        type: String,
        required: true,
    },
    content:{
        type: String,
        required: true,
    },
    comments:[{
        type:Schema.Types.ObjectId,
        ref:"comment",
    }]
})


const BlogPost=mongoose.model("blogPost",BlogPostSchema);

module.exports=BlogPost;







