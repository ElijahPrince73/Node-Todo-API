const {
	ObjectID
} = require('mongodb');

const {
	mongoose
} = require('../server/db/mongoose');

const {
	Todo
} = require('../server/models/todo');

const {
	User
} = require('../server/models/user');

// Todos
// const id = '5a8226818daa0e9407132e1bSDSD'
// ObjectID.isValid checks if id is valid Id
// if (!ObjectID.isValid(id)) {
// 	console.log('ID not valid');
// }

// Queries as many todos as I like
// Can specify how I want to query
// Todo.find({
// 	_id: id //<- dummy search
// }).then((todos) => {
// 	console.log('Todos', todos);
// })
//
// // Gets only one document
// Todo.findOne({
// 	_id: id //<- dummy search
// }).then((todo) => {
// 	console.log('Todo', todo);
// })

// Find By ID
// Todo.findById(id).then((todo) => {
// 	if (!todo) {
// 		return console.log('Id not found');
// 	}
// 	console.log(todo);
// }).catch((err) => {
// 	console.log(err);
// })

// Users
const id = '5a7ba4170745db83193ca4d0'

User.findById(id).then((value) => {
	if (!value) {
		return console.log('No User Found');
	}
	console.log(JSON.stringify(value, undefined, 2));
}).catch((err) => console.log(err))