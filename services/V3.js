const mongoose = require('mongoose')

//Get the existing reference to the exec() function
const exec=mongoose.Query.prototype.exec;
const {promisify}=require('util');

// const client=require('../redisClient');
// client.get=promisify(client.get);

mongoose.Query.prototype.exec=function(){

    // TODO Create New Object
    const key=Object.assign({},this.getQuery(),{
        collection: this.mongooseCollection.name
    })

    //TODO 2. run the original exec() function
    return exec.apply(this, arguments)
}



