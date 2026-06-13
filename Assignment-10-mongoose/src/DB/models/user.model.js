import { model, Schema } from 'mongoose';

const userSchema = new Schema(
	{
		name: {
			type: String,
			required: [true, 'User Name required.'],
		},
		email: {
			type: String,
			required: [true, 'Email required.'],
			unique: [true, 'Email must be unique, entered email already in use!'],
			trim: true,
		},
		password: {
			type: String,
			required: true,
		},
		phone: {
			type: String,
			required: [true, 'User phone number required.'],
			validate: {
				validator: function (value) {
					return /^01[0125][0-9]{8}$/.test(value);
				},
				message: (props) => `${props.value} is not a valid phone number!`,
			},
		},
		age: {
			type: Number,
			min: [18, 'Must be at least 18 years'],
			max: [60, 'Must be at maximum 60 years'],
		},

		// notes: [
		// 	{
		// 		type: Schema.Types.ObjectId,
		// 		ref: 'Note',
		// 	},
		// ],
	},
	{
		timestamps: true,
		// versionKey: 'version',
		// toJSON: { virtuals: true },
		// toObject: { virtuals: true },
	},
);

// const User = Model('User', userSchema);
const User = model('User', userSchema);
export default User;
