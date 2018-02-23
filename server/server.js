require('./config/config');

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
const {
	authenticate
} = require('./middleware/authenticate');
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

// POST /users
app.post('/users', (req, res) => {
	const body = _.pick(req.body, ['email', 'password'])
	const user = new User(body)

	user.save().then(() => {
		return user.generateAuthToken()
	}).then((token) => {
		res.header('x-auth', token).send(user)
	}).catch((err) => {
		res.status(400).send(err)
	})
})

app.post('/users/login', (req, res) => {
	const body = _.pick(req.body, ['email', 'password'])

	User.findByCredentials(body.email, body.password).then((user) => {
		return user.generateAuthToken().then((token) => {
			res.header('x-auth', token).send(user)
		})
	}).catch((err) => {
		res.status(400).send();
	})
})

app.get('/users/me', authenticate, (req, res) => {
	res.send(req.user)
})

app.listen(port, () => {
	console.log(`Started on port ${port}`);
})

module.exports = {
	app
}