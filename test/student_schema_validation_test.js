const mongoose = require("mongoose");
const Student = require("../models/studentSchema");
const expect = require("chai").expect;


describe("Student Schema Validation Test", function () {
    //
    // beforeEach(async function() {
    //
    //     const Student = await Student.create({name:"James Anderson",age:28})
    //
    // })

    it('should validate fields in Student Schema', async () => {

        const user = new Student({name: undefined})


        //TODO Do not use create() because it will create and save()
        // const user = await Student.create({name:undefined})

        const validationResult = user.validateSync();
        const {message} = validationResult.errors.name

        // console.log("VALIDATE SYNC ",message)

        expect(message).to.equal('name is required');

        // TODO we also have validate() difference is that validateSync() is synchronous

        // const userFound=Student.findOne({name:"James Anderson"})

    });

    it('should validate with a validation function ', async () => {

        // const userFound=Student.findOne({name:"James Anderson"})
        const user = new Student({name: "Sa", age: 30})
        const validationResult = user.validateSync();
        const {message} = validationResult.errors.name
        expect(message).to.equal('Name must be longer than 2 Characters');

    });

    it('should disallowed user to save  when user enter invalid data', async () => {

        // const userFound=Student.findOne({name:"James Anderson"})

        try {
            const user = await Student.create({name:"Sa",age:30})
            const validationResult = user.validateSync();
            const {message} = validationResult.errors.name
            expect(message).to.equal('Name must be longer than 2 Characters');
        } catch (e) {

            // const {message}=e.errors.name.properties
            const {message}=e.errors.name

            // console.log("ERROR OBJECT ",e)
            expect(message).to.equal('Name must be longer than 2 Characters');
            // console.log("Error Sahan",e.errors.name.properties.message)
            // console.log("Error ",e.errors._message)


        }



    });


})