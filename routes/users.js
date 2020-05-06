const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const { User, validate } = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('config')

// REGISTER A NEW USER
router.post('/', async (req, res) => {
	// VALIDATE THE REQUEST USING JOI
	const { error } = validate(req.body)
	if (error) {
		return res.status(400).send(error.details[0].message)
	}

	// RETURN AN ERROR IF THE EMAIL ADDRESS HAS ALREADY BEEN REGISTERED
	let user = await User.findOne({ email: req.body.email })
	if (user) return res.status(400).send({"message": "Email address has already been registered."})

	// CREATE NEW USER OBJECT
	user = new User({
		name: req.body.name,
		email: req.body.email,
		password: req.body.password
	})

	// HASH THE PASSWORD
	const salt = await bcrypt.genSalt(10)
	user.password = await bcrypt.hash(user.password, salt)

	// SAVE THE USER TO MONGODB
	await user.save()

	// GENERATE JWT
	const token = user.generateAuthToken()

	// SEND RESPONSE (WITH JWT IN HEADER)
	res.header('x-auth-token', token).send({
		name: user.name,
		email: user.email
	})
})

// GETTING A LIST OF ALL USERS
// router.post('/list', (req, res) => {
// 	const token = req.header('x-auth-token')
// 	if (!token) return res.status(401).send('Access denied. No token provided')

// 	try {
// 		const decoded = jwt.verify(token, config.get('jwtPrivateKey'))
// 		User.find().select('-password')
// 		.then(users => res.json(users))
// 	}
// 	catch(err) {
// 		res.status(400).send('Invalid token')
// 	}	
// })

module.exports = router