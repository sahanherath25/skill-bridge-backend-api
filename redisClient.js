//
// const Redis=require("@upstash/redis")
//
// const client = new Redis ({
//     url: process.env.UPSTASH_REDIS_REST_URL,
//     token:process.env.UPSTASH_REDIS_REST_TOKEN
// })
//
// (async () => {
//     try {
//         await client();
//         console.log("✅ Redis Connected")
//     } catch (err) {
//         console.error("❌ Failed to connect to Redis:", err);
//     }
//
// })();
//
// module.exports = client
//
//
//
//


// TODO OLD CODE
const { createClient } = require("redis");


const client=createClient({
    url:"redis://127.0.0.1:6379"
});



(async () => {
    try {
        await client.connect();
        console.log("✅ Redis Connected")
    } catch (err) {
        console.error("❌ Failed to connect to Redis:", err);
    }

})();

module.exports = client




