const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const { Post, validate } = require('../models/post')
const {User} = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('config')

// CREATE A NEW POST
router.post('/', async (req, res) => {
	// VALIDATE THE REQUEST USING JOI
	const { error } = validate(req.body)
	if (error) {
		return res.status(400).send(error.details[0].message)
	}

	const token = req.header('x-auth-token')
	const decoded = jwt.verify(token, config.get('jwtPrivateKey'))
	const user = await User.findById(decoded._id)
	const { name } = user

	post = new Post({
		title: req.body.title,
		subtitle: req.body.subtitle,
		category: req.body.category,
		name: name,
		article: req.body.article
	})

	await post.save()

	res.send('success')
})

// GETTING ALL POSTS
router.post('/getAll', (req, res) => {

	let skip = parseInt(req.body.skip)
	let limit = parseInt(req.body.limit)

	try {
		Post.find()
		.skip(skip)
		.limit(limit)
		.sort({"_id":-1})
		.then(posts => res.json(posts))
	}
	catch(err) {
		res.status(400).send('Error loading posts')
	}	
})

// GETTING A SPECIFIC POST
router.get('/getProductById', (req, res) => {

	let type = req.query.type
	let postId = req.query.id

try {
		Post.find({'_id': postId})
		.then(post => res.json(post))
	}
	catch(err) {
		res.status(400).send('Error loading post')
	}
})

// GET MY POSTS
router.get('/getPostByJWT', async (req, res) => {

	const token = req.query.JWT
	const decoded = jwt.verify(token, config.get('jwtPrivateKey'))
	const user = await User.findById(decoded._id)
	const { name } = user
	console.log(name);

try {
		Post.find({'name': name})
		.sort({"_id":-1})
		.then(post => res.json(post))
	}
	catch(err) {
		res.status(400).send('Error loading posts')
	}
})

// GET POSTS BY CATEGORY
router.get('/getPostByCategory', async (req, res) => {

try {
		Post.find({category: req.query.category})
		.sort({"_id":-1})
		.then(post => res.json(post))
	}
	catch(err) {
		res.status(400).send('Error loading posts')
	}
})


module.exports = router