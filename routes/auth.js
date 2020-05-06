const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const {User} = require('../models/user')
const Joi = require('joi')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('config')

// LOGIN
router.post('/', async (req, res) => {
	// VALIDATE THE REQUEST USING JOI
	const { error } = validate(req.body)
	if (error) return res.status(400).send(error.details[0].message)

	// RETURN AN ERROR IF THE EMAIL IS NOT REGISTERED
	let user = await User.findOne({ email: req.body.email })
	if (!user) return res.status(400).send('Invalid email.')

	// COMPARE THE ENTERED PASSWORD IN THE REQ WITH THE PASSWORD IN THE DATABASE
	const validPassword = await bcrypt.compare(req.body.password, user.password)
	if (!validPassword) return res.status(400).send('Invalid password.')

	// GENERATE JWT
	const token = user.generateAuthToken()

	const { name, email } = user

	// SEND RESPONSE (WITH JWT IN HEADER)
	res.header('x-auth-token', token).send({
		name, email
	})
})

function validate(req) {
	const schema = {
		email: Joi.string().min(5).max(200).required().email(),
		password: Joi.string().min(3).max(1024).required()
	}
	return Joi.validate(req, schema)
}

router.post('/check', async (req, res) => {
	const token = req.header('x-auth-token')
	if (!token) return res.status(401).send('Access denied. No token provided')

	try {
		const decoded = jwt.verify(token, config.get('jwtPrivateKey'))
		const user = await User.findById(decoded._id)
		const { name, email } = user
		res.send({
			name, email
		})
	}
	catch(err) {
		res.status(400).send('Invalid token')
	}
})

module.exports = router