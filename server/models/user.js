const mongoose = require('mongoose')

const User = mongoose.model('Users', {
	email: {
		type: String,
		minLength: 1,
		required: true,
		trim: true
	}
})

module.exports = {
	User
}

// const user = new User({
// 	email: 'elijahprince@gmail.com'
// })
//
// user.save().then((result) => {
// 	console.log('Saved User', JSON.stringify(result, undefined, 2));
// }, (e) => {
// 	console.log('Unable to create user', e);
// })