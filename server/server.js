const mongoose = require('mongoose');

mongoose.Promise = global.Promise

mongoose.connect('mongodb://localhost:27017/TodoApp')
// Todos

// Step 1: create a mongoose model
// ES6 class
// const Todo = mongoose.model('Todo', {
// 	text: {
// 		type: String,
// 		required: true,
// 		minLength: 1,
// 		trim: true
// 	},
// 	completed: {
// 		type: Boolean,
// 		default: false
// 	},
// 	completedAt: {
// 		type: Number,
// 		default: null
// 	}
// })

// step 2: create data for mongoose model
// creating object with only todo
// const newTodo = new Todo({
// 	text: 'Cook Dinner'
// })

// Step 3: tell mongoose to create a new model in database
// Mongoose then creates a new todo using the .save() function
// newTodo.save().then((doc) => {
// 	console.log('Saved Todo', doc);
// }, (e) => {
// 	console.log('Unable to save todo');
// })

// Challenge
// const todo1 = new Todo({
// 	text: 'Edit this vieo',
// 	completed: false,
// })
// todo1.save().then((doc) => {
// 	console.log('Saved Todo', JSON.stringify(doc, undefined, 2));
// }, (e) => {
// 	console.log('Unable to save todo', e);
// })

// Users
// const User = mongoose.model('Users', {
// 	email: {
// 		type: String,
// 		minLength: 1,
// 		required: true,
// 		trim: true
// 	}
// })
//
// const user = new User({
// 	email: 'elijahprince@gmail.com'
// })
//
// user.save().then((result) => {
// 	console.log('Saved User', JSON.stringify(result, undefined, 2));
// }, (e) => {
// 	console.log('Unable to create user', e);
// })