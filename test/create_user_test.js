const assert = require("assert")
const {promisify}=require("util")
const expect = require("chai").expect;
const Student=require("../models/studentSchema");



describe("User Creation Testing",()=>{

    it('should create new user', async () => {

        const userData={
            name:"Sahan Udara",
            age:27
        }


        const newUser=await Student.create(userData)
        const plainObject=await newUser.toObject();

        // console.log("TYPE ",typeof newUser)
        expect(plainObject).to.be.an("Object");
        expect(newUser).to.have.property("name");
        expect(newUser).to.have.property("age");

    });

    // it('should match the name', async () => {
    //
    //     const userData={
    //         name:"Sahan Udara",
    //         age:27
    //     }
    //
    //     const newUser=await User.create(userData)
    //     console.log("NEW USER CREATE IS ",newUser)
    //
    // });
    // it('should match the name', async () => {
    //
    //     const userData={
    //         name:"Sahan Udara",
    //         age:27
    //     }
    //
    //     const newUser=await User.create(userData)
    //     console.log("NEW USER CREATE IS ",newUser)
    //
    // })

})