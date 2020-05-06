const config = require('config')
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const helmet = require('helmet')
const usersRouter = require('./routes/users')
const authRouter = require('./routes/auth')
const postsRouter = require('./routes/posts')
const path = require('path')
require('./startup/prod')(app)

app.use(express.json())
app.use(cors({
  exposedHeaders: ['x-auth-token'],
}))
app.use('/api/users', usersRouter)
app.use('/api/auth', authRouter)
app.use('/api/posts', postsRouter)

if (!config.get('jwtPrivateKey')) {
	console.log('FATAL ERROR: jwtPrivateKey is not defined.');
	process.exit(1)
}

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/reminders-app')
	.then(() => console.log('connected to mongodb'))
	.catch(err => console.log('could not connect to mongodb', err))

if (process.env.NODE_ENV === 'production') {
	app.use(express.static(__dirname + '/client/build'))
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
	})
}

const port = process.env.PORT || 3000
app.listen(port, console.log(`Server is starting at port ${port}`))