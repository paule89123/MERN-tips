const Joi = require('joi')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const config = require('config')

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true,
		minlength: 1,
		maxlength: 200
	},
	email: {
		type: String,
		required: true,
		trim: true,
		minlength: 5,
		maxlength: 200,
		unique: true
	},
	password: {
		type: String,
		required: true,
		trim: true,
		minlength: 1,
		maxlength: 200
	}
})

userSchema.methods.generateAuthToken = function() {
	const token = jwt.sign({ _id: this._id }, config.get('jwtPrivateKey'))
	return token
}

const User = mongoose.model('User', userSchema)

function validateUser(user) {
	const schema = {
		name: Joi.string().min(1).max(200).required(),
		email: Joi.string().min(5).max(200).required().email(),
		password: Joi.string().min(1).max(200).required()
	}
	return Joi.validate(user, schema)
}

exports.User = User
exports.validate = validateUser