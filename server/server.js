// Heroku
const env = process.env.NODE_ENV || 'development'
console.log('env *********', env);
if (env === 'development') {
	process.env.PORT = 4000
	process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp'
} else if (env === 'test') {
	process.env.PORT = 4000
	process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest'
}

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');

const {
	ObjectID
} = require('mongodb');

const {
	mongoose
} = require('./db/mongoose');
const {
	User
} = require('./models/user.js');
const {
	Todo
} = require('./models/todo.js');

const app = express()

const port = process.env.PORT

app.use(bodyParser.json())

// POST a Todo
app.post('/todos', (req, res) => {
	const todo = new Todo({
		text: req.body.text
	})

	todo.save().then((doc) => {
		res.send(doc)
	}, (e) => {
		res.status(400).send(e)
	})
})


// Gets all todos
app.get('/todos', (req, res) => {
	Todo.find().then((todos) => {
		res.send({
			todos
		})
	}, (e) => {
		res.status(400).send(e)
	})
})

// Gets single todo
app.get('/todos/:id', (req, res) => {
	const id = req.params.id
	if (!ObjectID.isValid(id)) {
		return res.status(404).send('Invalid Id')
	}
	Todo.findById(id).then((todo) => {
		if (!todo) {
			return res.status(404).send({})
		}
		res.send({
			todo
		})
	}).catch((err) => {
		res.status(404).send('Unable to find that todo')
	})
})

// Delete single todo
app.delete('/todos/:id', (req, res) => {
	const id = req.params.id

	if (!ObjectID.isValid(id)) {
		return res.status(404).send('Invalid Id')
	}
	Todo.findByIdAndRemove(id).then((todo) => {
		if (!todo) {
			return res.status(404).send({})
		}
		res.send({
			todo
		})
	}).catch((err) => {
		res.status(404).send('Unable to delete that todo')
	})
})

// Patch
app.patch('/todos/:id', (req, res) => {
	const id = req.params.id
	const body = _.pick(req.body, ['text', 'completed'])

	if (!ObjectID.isValid(id)) {
		return res.status(404).send('Invalid Id')
	}

	if (_.isBoolean(body.completed) && body.completed) {
		body.completedAt = new Date().getTime()
	} else {
		body.completed = false
		body.completedAt = null
	}

	Todo.findOneAndUpdate(id, {
		$set: body
	}, {
		new: true
	}).then((todo) => {
		if (!todo) {
			return res.status(404).send()
		}
		res.send({
			todo
		})
	}).catch((err) => {
		res.status(400).send('Unable to update that todo')
	})
})

app.listen(port, () => {
	console.log(`Started on port ${port}`);
})

module.exports = {
	app
}