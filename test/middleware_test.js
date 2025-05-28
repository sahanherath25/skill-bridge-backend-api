const expect = require("chai").expect;
const Student=require('../models/studentSchema');
const BlogPost=require('../models/blogPostSchema');
const Comment=require('../models/commentSchema');

describe('Associations Tests', () => {

    beforeEach(async () => {

        //     TODO Need to create User, BlogPost , Comment

        let student,blogPost,comment

        student=new  Student({
            name:"Max Miller",
            age:27
        })

        blogPost=new BlogPost({
            title:"Advanced Node",
            content:"THere are many Advanced Concepts in Node  Like Clustering , Thread Pool "
        })

        comment=new Comment({
            content:"Wow i didnt know that ",
        })


        student.blogPosts.push(blogPost)
        blogPost.comments.push(comment)
        comment.author=student

        // console.log("comment author ",blogPost.comments)

        // await student.save()
        // await blogPost.save()
        // await comment.save()

        Promise.all([student.save(),blogPost.save(),comment.save()]).then((data) => {
            // console.log("Promise ",data)
        }).catch((e)=>{
            console.log("Promise  Error ",e)
        })


    })


    it('should load blogPosts array  and comments array', async () => {

        const studentFound=await Student.findOne({name:"Max Miller"}).populate({
            path:"blogPosts",
            populate:{
                path:"comments",
                model:"comment",
                populate:{
                    path:"author",
                    model:"student",
                }

            }
        })

        expect(studentFound).to.be.an("object")
        expect(studentFound.blogPosts).to.be.an("array")
        expect(studentFound.blogPosts[0]).to.be.an("object")
        expect(studentFound.blogPosts[0]).to.have.property("title","Advanced Node")


        // console.log("Student Found ",studentFound.blogPosts[0])

        const deletedUser=await studentFound.deleteOne({_id:studentFound._id})
        // console.log("DELETED USER IS ",deletedUser)


        // TODO After Deleting the BlogPosts in this user's we
        //  try to find are there any colleciont in blogposts
        const blogs=await BlogPost.countDocuments();

        // console.log("Documents Found is ",blogs)


        //
        // const studentFoundAfter=await Student.findOne({name:"Max Miller"}).populate({
        //     path:"blogPosts",
        //     populate:{
        //         path:"comments",
        //         model:"comment",
        //         populate:{
        //             path:"author",
        //             model:"student",
        //         }
        //
        //     }
        // })

    });

});