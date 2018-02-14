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
const port = process.env.PORT || 4000

app.use(bodyParser.json())

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
app.listen(port, () => {
	console.log(`Started on port ${port}`);
})

module.exports = {
	app
}