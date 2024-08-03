const mongoose = require("mongoose");
const { Schema } = mongoose;

const blogSchema = new Schema({
	title: String,
	content: String,
	imageUrl: String,
	// _user: { type: Schema.Types.ObjectId, ref: "User" },
	createdAt: { type: Date, default: Date.now },
});

mongoose.model("Blog", blogSchema);
