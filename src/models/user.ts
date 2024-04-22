import mongoose from "mongoose";

/**
 * User Model
 * 
 * This module defines the User model schema using Mongoose.
 * 
 * Schema Fields:
 * - auth0Id: String, required field for Auth0 user ID.
 * - email: String, field for user email.
 * - name: String,  field for user name.
 * - location: String, field for user's location. 
 * - hostel: String, field for user's hostel.
 * - office: String, field for user's office.
 * - PhoneNumber: Number, field for user's phone number.
 * 
 * Dependencies:
 * - mongoose: Library for MongoDB object modeling designed to work in an asynchronous environment.
 * 
 * @returns {Mongoose.Model} User model
 */

const userSchema = new mongoose.Schema({
	auth0Id: {
		type: String,
		require: true,
	},
	email: {
		type: String,
		require: true,
	},
	name: {
		type: String,
	},
	location: {
		type: String,
	},
	office: {
		type: String,
	},
	hostel: {
		type: String,
	},
	phoneNumber: {
		type: String,
	},
});

const User = mongoose.model("User", userSchema);

export default User;