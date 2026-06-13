import { model, Schema } from 'mongoose';
import User from './user.model.js';

const noteSchema = new Schema(
	{
		title: {
			type: String,
			required: [true, 'Note Title required.'],
			validate: {
				validator: function (value) {
					return value !== value.toUpperCase();
				},
				message: 'Note title must be in lowercase!',
			},
		},
		content: {
			type: String,
			required: [true, 'Note content required.'],
		},

		userId: {
			type: Schema.Types.ObjectId,
			ref: User,
			required: true,
		},
	},
	{
		timestamps: true,
		// versionKey: 'version',
		// toJSON: { virtuals: true },
		// toObject: { virtuals: true },
	},
);

const Note = model('Note', noteSchema);

export default Note;
