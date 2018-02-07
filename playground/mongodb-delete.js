const {
	MongoClient,
	ObjectID
} = require('mongodb');

const obj = new ObjectID()

const URL = 'mongodb://localhost:27017'

MongoClient.connect(URL, (err, client) => {
	if (err) {
		return console.log('Unable to connect to MongoDB server');
	}
	console.log('Connected to MongoDB server');

	const database = client.db('TodoApp');
	const TodosDB = 'Todos'
	const UsersDB = 'Users'

	// Todos
	// deleteMany
	// database.collection(TodosDB).deleteMany({
	// 	text: 'Feed the cat'
	// }).then((result) => {
	// 	console.log(result);
	// })

	// deleteOne
	// database.collection(TodosDB).deleteOne({
	// 	text: 'Cook Food'
	// }).then((result) => {
	// 	console.log(result);
	// });

	// findOneAndDelete
	// database.collection(TodosDB).findOneAndDelete({
	// 	completed: false
	// }).then((result) => {
	// 	console.log(result);
	// })


	// Users
	// database.collection(UsersDB).findOneAndDelete({
	// 	_id: new ObjectID('5a7a7ee214bd34734b5e11f5')
	// }).then((result) => {
	// 	console.log(result);
	// })

	// database.collection(UsersDB).deleteMany({
	// 	name: 'ricky'
	// }).then((result) => {
	// 	console.log(result);
	// })


	// client.close();
});