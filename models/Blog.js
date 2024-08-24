const mongoose = require("mongoose");
const { Schema } = mongoose;

const blogSchema = new Schema({
	title: String,
	content: String,
	imageUrl: String,
	userId: { type: Schema.Types.ObjectId, ref: "User" },
},{
	timestamps: true
});

mongoose.model("Blog", blogSchema);
