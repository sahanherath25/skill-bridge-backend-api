const Student = require("../models/studentSchema");
const expect=require("chai").expect;

describe("Delete Users", () => {

    beforeEach(async () => {
        const userData = {
            name: "Emma",
            age: 27
        }
        const newUser = await Student.create(userData)
        // console.log("Created New User",newUser)
    })

    it('should delete user matching filter object using deleteOne() ', async () => {
        const deletedUser = await Student.deleteOne({name: "Emma"})
        expect(deletedUser).to.exist;

        console.log("RETURN ",deletedUser);

        const userFound = await Student.findOne({name: "Emma"})
        // console.log("USER FOUDN in findOne",userFound)
        expect(userFound).to.be.null

    });

    it('should delete user matching filter object using findByIdAndDelete ', async () => {

        const userFound = await Student.findOne({name: "Emma"})


        const deletedUser = await Student.findByIdAndDelete(userFound._id.toString())
        // console.log("USER FOUND ",deletedUser)
        expect(deletedUser).to.exist;

    });

    it('should delete user matching filter object using findOneAndDelete ', async () => {

        const userFound = await Student.findOne({name: "Emma"})

        // console.log("USER FOUND ",userFound._id.toString())

        const deletedUser = await Student.findOneAndDelete({name: "Emma"})
        expect(deletedUser).to.exist;

    });


})