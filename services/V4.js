const mongoose = require('mongoose')

//Get the existing reference to the exec() function
const exec=mongoose.Query.prototype.exec;
const {promisify}=require('util');

const client=require('../redisClient');
// client.connect();
// client.get=promisify(client.get);

mongoose.Query.prototype.exec=async function(){
    // TODO 1. Our logic before execute any Query

    console.log("Im About to execute")

    // TODO 1. Create New Object
    const key=JSON.stringify(Object.assign({},this.getQuery(),{
        collection: this.mongooseCollection.name
    }))

    // TODO 2. Check if we have already have a value for the key in cache
    const cacheValue=await client.get(key)
    //
    if(cacheValue){
        console.log("Cache Value Exists ",cacheValue)
    }

    // TODO 3. If does exists  return the cache results

    // TODO 4. If not exists issue the query and store the results in cache
    const results=await exec.apply(this, arguments)
    //
    // // TODO Store the resutls in cache stringify before
    console.log("Query",results)

    return results

    //TODO 2. run the original exec() function
    // return results
}



