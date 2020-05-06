const Joi = require('joi')
const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		trim: true,
		minlength: 1,
		maxlength: 20000
	},
	subtitle: {
		type: String,
		required: true,
		trim: true,
		minlength: 1,
		maxlength: 20000
	},
	category: {
		type: String,
		required: true,
		trim: true,
		minlength: 1,
		maxlength: 20000
	},
	name: {
		type: String,
		required: true,
		trim: true,
		minlength: 1,
		maxlength: 200
	},
	article: {
		type: String,
		required: true,
		trim: true,
		minlength: 1,
		maxlength: 90000
	}
})

const Post = mongoose.model('Post', postSchema)

function validatePost(post) {
	const schema = {
		title: Joi.string().min(1).max(20000).required(),
		subtitle: Joi.string().min(1).max(20000).required(),
		category: Joi.string().min(1).max(20000).required(),
		name: Joi.string().min(1).max(200).required(),
		article: Joi.string().min(3).max(90000).required(),
	}
	return Joi.validate(post, schema)
}

exports.Post = Post
exports.validate = validatePost