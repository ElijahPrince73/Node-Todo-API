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
// Delete multiple records
// Todo.remove({}).then((result) => {
// 	console.log(result);
// })

// Finds one document and removes it, it also returns the removed data
Todo.findOneAndRemove({
	_id: '5a83b0f713609c5d0464c9b6'
}).then((todo) => {
	console.log(todo);
})

// Finds ID and removes it
// Todo.findByIdAndRemove('5a83b0fb13609c5d0464c9b9').then((todo) => {
// 	console.log(todo);
// })