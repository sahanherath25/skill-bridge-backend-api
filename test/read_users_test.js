const Student = require("../models/studentSchema");
const expect=require("chai").expect;

describe("Reading Users",()=>{


    let newUser;

    beforeEach(async () => {
        const userData={
            name:"James Anderson",
            age:40
        }
        newUser=await Student.create(userData)
    })


    let foundUsers;

    it('should find all users', async () => {

        foundUsers=await Student.find()

        // console.log("FOUND USERS ",foundUsers)

        expect(foundUsers).to.exist;
        expect(foundUsers).to.be.an('array');
        expect(foundUsers.length).to.be.equal(2)
        expect(foundUsers[0]).to.have.property('name');
        expect(foundUsers[0]).to.have.property('age');


    });

    it('should find single user', async () => {

        const foundUser=await Student.findOne({name:"James Anderson"})

        // console.log("New USer ID",newUser._id);
        // console.log("Found User USer ID",foundUser._id);

        // expect(foundUser._id.toString()).equal(newUser._id.toString());



        expect(foundUser).to.exist;
        expect(foundUser).to.be.an('object');
        // TODO Property Exists Test
        expect(foundUser).to.have.property('name');
        expect(foundUser).to.have.property('age');

        // TODO Property  and value Exists  Test
        expect(foundUser).to.have.property('name', 'James Anderson');
        expect(foundUser).to.have.property('age', 40);


    });

    it('should find a user with particular user id ', async () => {

        const userFound=await Student.findById(newUser._id)
        expect(userFound).to.exist;
        expect(userFound).to.have.property("name");
        expect(userFound).to.have.property("age");

    });


})