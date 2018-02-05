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

	// database.collection(UsersDB).find({
	// 	name: "ricky"
	//Finds specified id
	// _id: new ObjectID('5a76b49d6142066204148b03')
	// }).toArray().then((docs) => {
	// 	console.log('Todos');
	// 	console.log(JSON.stringify(docs, undefined, 2));
	// }, (err) => {
	// 	console.log('Unable to fetch todos');
	// })

	database.collection(UsersDB).find({
		name: 'ricky'
	}).toArray().then((users) => {
		console.log(JSON.stringify(users, undefined, 2));
	}, (err) => {
		console.log('Cant find that user');
	})

	// database.collection(UsersDB).find({
	// 	name: "ricky"
	// }).count().then((count) => {
	// 	console.log('Todos count', count);
	// }, (err) => {
	// 	console.log('Unable to fetch todos');
	// })


	// client.close();
});