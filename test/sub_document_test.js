const expect = require("chai").expect;
const Student=require('../models/studentSchema');

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
})

