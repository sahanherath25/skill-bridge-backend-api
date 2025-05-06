const expect = require("chai").expect;
const Student=require('../models/studentSchema');
const assert = require('assert');

describe("Sub Document Tests", function() {

    it('should create a sub document', async() => {
    //     TODO create a user with posts
        const user=await Student.create({
            name:"Diana Mae",
            age:27,
            posts:[
                {title:"Flipped"},
                {title:"One Day"}
            ]
        })

        // console.log("User Fro  Sub Document ",user)
        expect(user.posts.length).to.be.equal(2);

    });

    it('should able to add sub document to an existing document', async() => {

    //     TODO create a user with posts
        const user=await Student.create({
            name:"Alex Johnson",
            age:27,
        })
        const updatedUser=await Student.findOneAndUpdate({name:"Alex Johnson"},{$push:{posts:{title:"Batman"}}},{new:true})

        // console.log("User Fro  Sub Document ",updatedUser)
        expect(updatedUser.posts.length).to.be.equal(1);
        expect(updatedUser.posts[0]).to.have.property('title','Batman');

        const foundUser=await Student.findOne({name:"Alex Johnson"})

        if(foundUser){
            foundUser.posts.push({title:"Jocker"})
            await foundUser.save()

        }

        const after=await Student.findOne({name:"Alex Johnson"})
        expect(after.posts.length).to.be.equal(2);
        expect(after.posts[0]).to.have.property('title','Batman');
        expect(after.posts[1]).to.have.property('title','Jocker');



    });

    xit('should able to create and delete a  sub document ', async() => {

    //     TODO create a user with posts
        const user=await Student.create({
            name:"Diamond Johnson",
            age:27,
        })
        const updatedUser=await Student.findOneAndUpdate({name:"Diamond Johnson"},{$push:{posts:{title:"Batman"}}},{new:true})

        // console.log("User Fro  Sub Document ",updatedUser)
        expect(updatedUser.posts.length).to.be.equal(1);
        expect(updatedUser.posts[0]).to.have.property('title','Batman');

        const foundUser=await Student.findOne({name:"Diamond Johnson"})

        console.log("DIAMON USER ",foundUser)

        const postToRemove=foundUser.posts.id(foundUser.posts[0]._id)
        foundUser.posts.pull(postToRemove)
        await foundUser.save()

        console.log("POST TO REMOTE  ",postToRemove)

        const afterDeletePost=await Student.findOne({name:"Diamond Johnson"})

        console.log("DIAMON USER ",afterDeletePost)

        // assert.strictEqual(afterDeletePost.posts.length, 3);
        // if(foundUser){
        //     foundUser.posts.push({title:"Jocker"})
        //     await foundUser.save()
        //
        // }




    });

    it('should able to check a virtual prop added ', async() => {

    //     TODO create a user with posts
        const user=await Student.create({
            name:"Diamond Johnson",
            age:27,
        })



        // TODO Add A Sub document
        const updatedUser=await Student.findByIdAndUpdate(user.id,{$push:{posts:{title:"Amazing Spiderman"}}},{new:true})


        expect(updatedUser.posts.length).to.be.equal(1);
        expect(updatedUser.posts[0].title).to.be.equal("Amazing Spiderman");
        expect(updatedUser.posts[0]).to.have.property("title","Amazing Spiderman");
        expect(updatedUser.postCount).to.be.equal(1,"We have Virtual Property");

        const foundUser=await Student.findById(updatedUser.id)
        const postToRemove=foundUser.posts.id(foundUser.posts[0]._id)
        // foundUser.posts.pull(postToRemove)
        // await foundUser.save()

        // TODO Find the User and Remove the SubDocument
        const userAfterDelete=await Student.findByIdAndUpdate(foundUser.id,{$pull:{posts:{_id:postToRemove}}},{new:true})

        // console.log("Hello Sahan",userAfterDelete)





    });

})

