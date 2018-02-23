const mongoose = require('mongoose')
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const _ = require('lodash');

const UserSchema = new mongoose.Schema({
	email: {
		type: String,
		minLength: 1,
		required: true,
		trim: true,
		unique: true,
		validate: {
			validator: validator.isEmail,
			message: '{VALUE} is not a valid email'
		}
	},
	password: {
		type: String,
		required: true,
		minLength: 6
	},
	tokens: [{
		access: {
			type: String,
			required: true
		},
		token: {
			type: String,
			required: true
		}
	}]
})

UserSchema.methods.toJSON = function() {
	const user = this
	const userObject = user.toObject()

	return _.pick(userObject, ['_id', 'email'])
}

UserSchema.methods.generateAuthToken = function() {
	const user = this
	const access = 'auth'
	const token = jwt.sign({
		_id: user._id.toHexString(),
		access
	}, 'abc123').toString()
	user.tokens = user.tokens.concat([{
		access,
		token
	}])
	return user.save().then(() => {
		return token
	})
}

UserSchema.statics.findByToken = function(token) {
	const User = this
	var decoded;

	try {
		decoded = jwt.verify(token, 'abc123')
	} catch (e) {
		//This is the same as the below function
		// return new Promise((resolve, reject) => reject())
		return Promise.reject()
	}

	return User.findOne({
		'_id': decoded._id,
		'tokens.token': token,
		'tokens.access': 'auth'
	})
}

UserSchema.pre('save', function(next) {
	var user = this
	if (user.isModified('password')) {
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(user.password, salt, (err, hash) => {
				user.password = hash
				next()
			})
		})
	} else {
		next()
	}
})

const User = mongoose.model('Users', UserSchema)

module.exports = {
	User
}