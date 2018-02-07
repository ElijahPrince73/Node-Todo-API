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
	// FindOneAndUpdate
	// database.collection(TodosDB).findOneAndUpdate({
	// 	_id: new ObjectID('5a7a7884e963f66fae0f8e40')
	// }, {
	// 	$set: {
	// 		completed: true
	// 	}
	// }, {
	// 	returnOriginal: false
	// }).then((result) => {
	// 	console.log(result);
	// })

	database.collection(UsersDB).findOneAndUpdate({
		_id: new ObjectID('5a7a7ece9668057346a5668b')
	}, {
		$set: {
			name: "Elijah Prince"
		},
		$inc: {
			age: 1
		}
	}, {
		returnOriginal: false
	}).then((result) => {
		console.log(result);
	})
	// client.close();
});