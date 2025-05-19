const User=require('../models/userSchema');


exports.fetchUser = async (req, res, next) => {

    res.status(200).json({
        status: "success",
        message: "Api is Still Implementing"

    })
}

exports.fetchAllUsers = async (req, res, next) => {


    const users=await User.find().cache()

    res.status(200).json({
        status: "success",
        message: "Found Users",
        data:{
            users:users
        }

    })
}

exports.loginUser = async (req, res, next) => {




    res.status(200).json({
        status: "success",
        message: "Api is Still Implementing"

    })
}

