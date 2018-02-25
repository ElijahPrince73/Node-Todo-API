const mongoose = require('mongoose');

// Step 1: create a mongoose model
const Todo = mongoose.model('Todo', {
	text: {
		type: String,
		required: true,
		minLength: 1,
		trim: true
	},
	completed: {
		type: Boolean,
		default: false
	},
	completedAt: {
		type: Number,
		default: null
	},
	_creator: {
		type: mongoose.Schema.Types.ObjectId,
		required: true
	}
})

module.exports = {
	Todo
}
// Step 2: create data for mongoose model
// creating object with only todo
// const newTodo = new Todo({
// 	text: 'Cook Dinner'
// })

// Step 3: tell mongoose to create a new model in database
// Mongoose then creates a new todo using the.save()
// newTodo.save().then((doc) => {
// 	console.log('Saved Todo', doc);
// }, (e) => {
// 	console.log('Unable to save todo');
// })