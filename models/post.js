const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
	username: {
		type: String,
	},
	text: {
		type: String,
		required: "Please, enter some text",
		validate: [
			{
				validator: value => value.length < 200,
				msg:'Message must be less than 200 symbols'
			}
			]
		
	},
	versionKey: false
});

module.exports = mongoose.model('Post', postSchema);