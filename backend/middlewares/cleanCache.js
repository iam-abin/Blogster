const { clearCache } = require("../utils/cache");

module.exports = async(req,res,next) =>{
    await next(); // it allow our route handler to run first. clearCache will execute only after that

    clearCache(req.user.id)
}