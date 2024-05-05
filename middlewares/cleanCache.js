const { clearHash } = require("../services/cache");

module.exports = async(req,res,next) =>{
    await next(); // it allow our route handler to run first. clearHash will execute only after that

    clearHash(req.user.id)
}