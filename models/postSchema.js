const mongoose = require('mongoose');
const  express = require('express');
const Schema=mongoose.Schema


const PostSchema=new Schema({
    title:String,

})

module.exports=PostSchema;

