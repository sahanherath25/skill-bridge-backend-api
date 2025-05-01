const mongoose = require('mongoose')

//Get the existing reference to the exec() function
const exec=mongoose.Query.prototype.exec;

mongoose.Query.prototype.exec=function(){
    // TODO 1. Our logic before execute any Query
    console.log("Im About to execute")

    console.log("Current Query is ")
    console.log(this.getQuery())


    console.log("collection name ",this.mongooseCollection.name)


    //TODO 2. run the original exec() function

    return exec.apply(this, arguments)
}



