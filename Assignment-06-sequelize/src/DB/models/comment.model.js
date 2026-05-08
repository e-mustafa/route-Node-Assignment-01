import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../connection.js';

export default class CommentModel extends Model {}
CommentModel.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		content: {
			type: DataTypes.TEXT,
			allowNull: false,
			validate: {
				notEmpty: { msg: 'Content is required' },
				notNull: { msg: 'Content is required' },
				len: {
					args: [5, 500],
					msg: 'Content must be at least 5 characters long',
				},
			},
		},
		postId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				notEmpty: { msg: 'Post is required, please provide postId.' },
				notNull: { msg: 'Post is required, please provide postId.' },
			},
		},
		userId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				notEmpty: { msg: 'User is required, please provide userId' },
				notNull: { msg: 'User is required, please provide userId' },
			},
		},
	},
	{
		sequelize,
		timestamps: true,
		paranoid: true,
		modelName: 'comment',
	},
);
