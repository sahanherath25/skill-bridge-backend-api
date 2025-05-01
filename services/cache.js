const mongoose = require('mongoose')

//Get the existing reference to the exec() function
const exec = mongoose.Query.prototype.exec;
const {promisify} = require('util');

const client = require('../redisClient');
// client.connect();
client.get=promisify(client.hGet);

mongoose.Query.prototype.cache = function (options={}) {

//     TODO if this cache() is called
    this.useCache = true;
    console.log("HASH KEY PROVIDED IS ",options.key)
    this.hashKey=JSON.stringify(options.key)||""
    return this;
}



mongoose.Query.prototype.exec = async function () {

    // TODO Check if useCache property not exists execute normal way
    if (!this.useCache) {
        console.log("useCache property  Logic Not Exists")
        return exec.apply(this,arguments)
    }else {

        // console.log("Top Level Hash Key is ",this.hashKey)

        // console.log("useCache property is Exists Using Cache Logic")
        // TODO If useCache property exists Use Cache logic
        // TODO 1. Our logic before execute any Query
        // console.log("Im About to execute")

        // TODO 1. Create New Object
        const key = JSON.stringify(Object.assign({}, this.getQuery(), {
            collection: this.mongooseCollection.name
        }))

        // TODO 2. Check if we have already have a value for the key in cache
        const cacheValue = await client.hGet(this.hashKey,key)

        // console.log("Cache ")

        // TODO 3. If does exists  return the cache results
        if (cacheValue) {
            // Crete new Document using cached results of JS Object conversion
            const doc = JSON.parse(cacheValue)
            console.log("Cache Hit Serving From Cache ")
            return Array.isArray(doc) ? doc.map(doc => {
                return new this.model(doc)
            }) : new this.model(doc)
        }

        console.log("cache NOT EXIS GOING TO SAVE")

        // TODO 4. If not exists issue the query and store the results in cache
        const results = await exec.apply(this, arguments)

        // TODO 5. Store the results in cache stringify before
        const convertedJOSN = JSON.stringify(results)

        // TODO 6. Store the results in cache
        console.log("Cache key is ",convertedJOSN)

        client.hSet(this.hashKey,key, convertedJOSN,"EX",10)
        // TODO return results Here we should return Mongoose Document not JS Object
        //TODO run the original exec() function
        return results
    }

}

module.exports={
    async clearHash(hashKey){

        const res=JSON.stringify(hashKey)

        console.log("User Stored CACHE KEY IS  ",res)

        console.log("Found Data to Delete",hashKey)

       await client.del(JSON.stringify(hashKey))
    }
}



