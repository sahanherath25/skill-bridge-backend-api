const expect = require("chai").expect;
const Student=require("../models/studentSchema");

describe("Update Users",()=>{

    beforeEach(async()=>{

        const newUser=await Student.create({name:"Summer",age:28})


    })


    it('should update user name by updateOne', async () => {

        const foundUser=await Student.findOne({name:"Summer"})
        expect(foundUser).to.be.exist

        const updatedUser=await Student.updateOne({name:"Summer"},{name:"Summer Herath"})
        const updatedUserResults=await Student.findOne({name:"Summer Herath"})

        expect(updatedUserResults).to.be.exist
        expect(updatedUserResults).to.have.property('name');
        expect(updatedUserResults).to.have.property('age');
        expect(updatedUserResults).to.have.property('name',"Summer Herath");
        expect(updatedUserResults).not.to.have.property('name',"Summer");


        // console.log("USER UPDATED ",updatedUserResults)
    });

    it('should update user name by findOneAndUpdate', async () => {

        const foundUser=await Student.findOne({name:"Summer"})
        expect(foundUser).to.be.exist

        const updatedUser=await Student.findOneAndUpdate({_id:foundUser.id},{name:"Summer Herath"},{new:true})
        const updatedUserResults=await Student.findOne({name:"Summer Herath"})
        // console.log("UPDATED ",updatedUser)

        expect(updatedUserResults).to.be.exist
        expect(updatedUserResults).to.have.property('name');
        expect(updatedUserResults).to.have.property('age');
        expect(updatedUserResults).to.have.property('name',"Summer Herath");
        expect(updatedUserResults).not.to.have.property('name',"Summer");


        // console.log("USER UPDATED ",updatedUserResults)
    });

    it('should update user name by findByIdAndUpdate', async () => {

        const foundUser=await Student.findOne({name:"Summer"})
        expect(foundUser).to.be.exist

        const updatedUser=await Student.findByIdAndUpdate(foundUser.id,{name:"Summer Herath"},{new:true})

        const updatedUserResults=await Student.findOne({name:"Summer Herath"})
        // console.log("UPDATED ",updatedUser._id)
        // console.log("UPDATED ",foundUser._id)
        // console.log("Are the same  ",foundUser.id===updatedUser.id)

        expect(updatedUserResults).to.be.exist
        expect(updatedUserResults).to.have.property('name');
        expect(updatedUserResults).to.have.property('age');
        expect(updatedUserResults).to.have.property('name',"Summer Herath");
        expect(updatedUserResults).not.to.have.property('name',"Summer");

    });

    it('should update user name by update', async () => {

        const foundUser=await Student.findOne({name:"Summer"})
        expect(foundUser).to.be.exist

        // console.log("Before Podate AGE UPDATE ",foundUser)

        const updatedUser=await Student.updateOne({name:foundUser.name},{$inc:{age:1}},{new:true})

        const updatedUserResults=await Student.findOne({name:"Summer Herath"})

        // console.log("AFTER AGE UPDATE ",updatedUserResults)

        expect(updatedUserResults).to.be.exist
        expect(updatedUserResults).to.have.property('name');
        expect(updatedUserResults).to.have.property('age');
        expect(updatedUserResults).to.have.property('name',"Summer Herath");
        // expect(updatedUserResults).not.to.have.property('name',"Summer");


        // console.log("USER UPDATED ",updatedUserResults)
    });


})