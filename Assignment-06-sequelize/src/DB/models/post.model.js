import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../connection.js';

export default class PostModel extends Model {}

PostModel.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		title: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: { msg: 'Title is required' },
				notNull: { msg: 'Title is required' },
				len: {
					args: [5, 500],
					msg: 'Title must be at least 5 characters long',
				},
			},
		},
		content: {
			type: DataTypes.TEXT('long'),
			allowNull: false,
			validate: {
				notEmpty: { msg: 'Title is required' },
				notNull: { msg: 'Title is required' },
				min: {
					args: 5,
					msg: 'Title must be at least 5 characters long',
				},
			},
		},

		excerpt: {
			type: DataTypes.VIRTUAL,
			get() {
				return `${this.getDataValue('content').substring(0, 150)}...`;
			},
		},

		userId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				notEmpty: { msg: 'User is required' },
				notNull: { msg: 'User is required' },
			},
		},

		// additional attributes --------------------------------------------
		// categories,
		// tags
	},
	{
		sequelize,
		timestamps: true,
		modelName: 'post',
		// soft delete
		paranoid: true,
	},
);
