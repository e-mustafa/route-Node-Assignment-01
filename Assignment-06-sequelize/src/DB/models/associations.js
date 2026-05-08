import CommentModel from './comment.model.js';
import PostModel from './post.model.js';
import UserModel from './user.model.js';

const associations = () => {
	// relationship between models user and post ----------------------------
	UserModel.hasMany(PostModel, {
		foreignKey: 'userId',
		as: 'posts',
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE',
	});

	PostModel.belongsTo(UserModel, {
		foreignKey: 'userId',
		as: 'user',
	});

	// relationship between models post and comment ----------------------------
	PostModel.hasMany(CommentModel, {
		foreignKey: 'postId',
		as: 'comments',
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE',
	});

	CommentModel.belongsTo(PostModel, {
		foreignKey: 'postId',
		as: 'post',
	});

	// relationship between models user and comment ----------------------------
	UserModel.hasMany(CommentModel, {
		foreignKey: 'userId',
		as: 'comments',
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE',
	});

	CommentModel.belongsTo(UserModel, {
		foreignKey: 'userId',
		as: 'user',
	});
};

export default associations;
