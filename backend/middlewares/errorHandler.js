const errorHandler = (err, req, res, next) => {
	console.log(err.stack);
	res.status(err.status || 500).json({
		message: err.message || "something went wrong!!!",
	});
};


module.exports = {errorHandler}