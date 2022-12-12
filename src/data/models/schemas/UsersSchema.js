import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';
import { timeStamp } from 'console';

const Schema = mongoose.Schema;

const UsersSchema = new Schema({
	fullName: {
		type: String,
		required: true,
		trim: true,
		unique: true,
	},
	userName: {
		type: String,
		required: true,
		trim: true,
		unique: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		trim: true,
		lowercase: true
	},
	password: {
		type: String,
		required: true
	},
	
	// avatar: {
	// 	type: String,
	// 	trim: true,
	// },
	isActive: {
		type: Boolean,
		required: true,
		default: true
	},
	registrationDate: {
		type: Date,
		required: true,
		default: Date.now()
	},
	lastLogin: {
		type: Date,
		required: true,
		default: Date.now()
	}
});

/**
 * Hash the password of user before save on database
 */
UsersSchema.pre('save', function (next) {
	if (!this.isModified('password')) {
		return next();
	}
	bcrypt.genSalt((err, salt) => {
		if (err) {
			return next(err);
		}
		bcrypt.hash(this.password, salt, (err, hash) => {
			if (err) {
				return next(err);
			}
			this.password = hash;
			next();
		});
	});
});

export { UsersSchema };
