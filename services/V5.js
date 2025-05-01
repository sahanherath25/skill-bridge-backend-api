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

    // TODO 3. If does exists  return the cache results
    if(cacheValue){

        // Crete new Document using cached results of JS Object conversion
        const doc=JSON.parse(cacheValue)
        //Check  If Array Or Object

        console.log("Cache Value Exists ",Array.isArray(doc))

        return Array.isArray(doc)?doc.map(doc=>{
            return  new this.model(doc)
        }):new this.model(doc)

    }


    // TODO 4. If not exists issue the query and store the results in cache
    const results=await exec.apply(this, arguments)


    // TODO 5. Store the results in cache stringify before
    const convertedJOSN=JSON.stringify(results)


    // TODO 6. Store the results in cache
    client.set(key,convertedJOSN)

    // TODO return results Here we shoud lreturn Mongoose Document not JS Object
    return results

    //TODO run the original exec() function

}



