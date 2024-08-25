const mongoose = require("mongoose");
const util = require("util");
const redis = require("redis");
const redisUrl = "redis://127.0.0.1:6379";
const client = redis.createClient(redisUrl);
client.hget = util.promisify(client.hget); //  promisify() converts callback-based methods to promise-based.

const exec = mongoose.Query.prototype.exec; // it stores reference to the original mongoose 'exec' function

// Creating a function for caching. Caching will perform only if 'useCache' variable is true
mongoose.Query.prototype.cache = function (options = {}) { // example req.user.id is key in find().cache({key: req.user.id}); 
	this.useCache = true; // 'useCache' is a variable that we are creating now, its not built-in
	this.hashKey = JSON.stringify(options.cacheValuekey || ""); // key passing in options is the top-level key, ie, hashkey ie, userId

	return this; // It will help for chaining in the query, eg:- .limit(10).cache().skip(2).sort()
};

// overrite 'exec' function and add some extra logic
mongoose.Query.prototype.exec = async function () {
	if (!this.useCache) {
		return exec.apply(this, arguments);
	}

	// FOLLOWING ARE THE CODE RELATED TO CACHING IF 'this.useCache' IS TRUE
	// We need to store js objects as string in reids
	const key = JSON.stringify(
		// 'this' represents 'mongoose.Query'
		// this.getQuery() used to return all the current query filter as a single js object
		// ie, things passing inside find() are using ase key with collectin name
		// this.mongooseCollection.name
		Object.assign({}, this.getQuery(), {
			collection: this.mongooseCollection.name,
		})
	);

	// check if we have value for key in redis
	const cacheValue = await client.hget(this.hashKey, key);
	// console.log("cacheValue ",cacheValue);
	
	// if the blogs are cached, then send the cached blogs immediately
	if (cacheValue) {
		console.log("<=============== SERVING FROM CACHE ===============>");
		console.log("=====> From cache hashKey:", this.hashKey);
		console.log("=====> From cache key:", key);
		const doc = JSON.parse(cacheValue);

		return Array.isArray(doc)
			? doc.map((d) => new this.model(d))
			: new this.model(doc);
	}

	// Otherwise, issue the query and store the result in redis
	const result = await exec.apply(this, arguments);
	// hset eg_- {user1: {name: "abin", age: 10}} // its like a nested object
	
	await client.hset(this.hashKey, key, JSON.stringify(result));
	client.expire(this.hashKey, 10); // Expire the entire hash after 10 seconds
	
	console.log("Creating cache for hashKey:", this.hashKey);
	console.log("Creating cache for key:", key);
	console.log("<=============== SERVING FROM MONGO ===============>");
	return result;
};

module.exports = {
	async clearCache(hashKey) {
		const key = JSON.stringify(hashKey);
		console.log("Clearing cache for hashKey:", key);
		await client.del(key, (err, response) => {
			if (err) {
				console.error("Failed to clear cache:", err);
			} else {
				console.log("<=============== CLEARING CACHE ===============>");
				console.log("Cache cleared successfully:", response);
			}
		});
	},
};
// module.exports = {
// 	clearCache(hashKey) {
// 		client.del(JSON.stringify(hashKey));
// 	},
// };
