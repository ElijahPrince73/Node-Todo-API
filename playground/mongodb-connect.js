const {
	MongoClient,
	ObjectID
} = require('mongodb');

const obj = new ObjectID()

console.log(obj);

const URL = 'mongodb://localhost:27017'

MongoClient.connect(URL, (err, client) => {
	if (err) {
		return console.log('Unable to connect to MongoDB server');
	}
	console.log('Connected to MongoDB server');

	const database = client.db('TodoApp');
	const TodosDB = 'Todos'
	const Users = 'Users'

	// database.collection(TodosDB).insertOne({
	// 	text: 'something to do',
	// 	completed: false
	// }, (err, result) => {
	// 	if (err) {
	// 		return console.log('Unable to insert todo', err);
	// 	}
	// 	console.log(JSON.stringify(result.ops, undefined, 2));
	// });

	database.collection(Users).insertOne({
		name: "ricky",
		age: 21,
		location: 'Las Vegas'
	}, (err, result) => {
		if (err) {
			return console.log('Unable to insert user');
		}
		console.log(JSON.stringify(result.ops[0]._id.getTimestamp(), undefined, 2));
	})

	client.close();
});