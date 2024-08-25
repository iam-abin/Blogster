const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
	googleId: String,
	displayName: String,
	profileImage: String
},{
	timestamps: true
});

mongoose.model("User", userSchema);
