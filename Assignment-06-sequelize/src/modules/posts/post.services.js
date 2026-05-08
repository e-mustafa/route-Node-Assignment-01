import { sequelize } from '../../DB/connection.js';
import { CommentModel as Comment, PostModel as Post, UserModel as User } from '../../DB/models/index.js';
import { isExistById } from '../../utils/api-utils.js';
import catchResError from '../../utils/catch-res-error.js';

export const addPost = async (req, res) => {
	try {
		const { userId, title, content } = req.body;

		// if (!userId || !title || !content) {
		// 	return res.status(400).json({ success: false, message: 'Missing required fields.' });
		// }

		// if (userId) {
		// 	const user = await User.findByPk(userId);
		// 	if (!user) {
		// 		return res.status(404).json({ success: false, message: `User with id ${userId} not found.` });
		// 	}
		// }

		// check if user id exist
		await isExistById(userId, User, res, 'User');

		const post = await new Post({ userId, title, content });
		await post.save();

		return res.status(201).json({ success: true, message: 'Post created successfully.', data: post });
	} catch (error) {
		catchResError(error, res, true);
	}
};

export const deletePost = async (req, res) => {
	try {
		const { id } = req.params;
		const { userId } = req.body;

		// check if post exist by id
		const post = await Post.findByPk(id);
		if (!post) {
			return res.status(404).json({ success: false, message: 'Post not found.' });
		}

		// check if user exist by userId
		const user = await User.findByPk(userId);
		if (!user) {
			return res.status(404).json({ success: false, message: 'User not found.' });
		}

		// check if user is owner of post
		if (post.userId !== userId) {
			return res.status(403).json({ success: false, message: 'You are not authorized to delete this post.' });
		}

		await post.destroy();
		return res.status(200).json({ success: true, message: 'Post deleted successfully.' });
	} catch (error) {
		catchResError(error, res);
	}
};

export const getPostsDetails = async (req, res) => {
	try {
		const posts = await Post.findAll({
			where: { deletedAt: null },
			attributes: [['id', 'postId'], 'title'],
			include: [
				{ model: User, as: 'user', attributes: [['id', 'userId'], 'name'] },
				{ model: Comment, as: 'comments', attributes: [['id', 'commentId'], 'content'] },
			],
		});
		return res.status(200).json({ success: true, message: 'Posts fetched successfully.', data: posts });
	} catch (error) {
		catchResError(error, res);
	}
};

export const getAllPosts = async (req, res) => {
	try {
		const data = await Post.findAll({
			where: { deletedAt: null },
			attributes: [
				'id',
				'title',
				[sequelize.fn('COUNT', sequelize.col('Comments.id')), 'comments_count'],
				// [sequelize.fn('COUNT', sequelize.col('Comments.id')), 'commentsCount']
			],
			include: [{ model: Comment, as: 'comments', attributes: [] }],
			group: ['Post.id'],
		});
		return res.status(200).json({ success: true, message: 'Posts fetched successfully.', data });
	} catch (error) {
		catchResError(error, res);
	}
};

// ***************** extra
export const updatePost = async (req, res) => {
	try {
		const { id } = req.params;
		const { title, content, userId } = req.body;

		// // check if post exist and user is owner -- in one step
		// const post = await Post.findOne({ where: { id, userId } });
		// if (!post) {
		// 	return res
		// 		.status(404)
		// 		.json({ success: false, message: 'Post not found or You are not authorized to update this post.' });
		// }

		// or 3 steps check if post exist by id
		const post = await Post.findByPk(id);
		if (!post) {
			return res.status(404).json({ success: false, message: 'Post not found.' });
		}

		// check if user exist by userId
		const user = await User.findByPk(userId);
		if (!user) {
			return res.status(404).json({ success: false, message: 'User not found.' });
		}

		// check if user is owner of post
		if (post.userId !== userId) {
			return res.status(403).json({ success: false, message: 'You are not authorized to update this post.' });
		}

		await post.update({ title, content });
		return res.status(200).json({ success: true, message: 'Post updated successfully.' });
	} catch (error) {
		catchResError(error, res, true);
	}
};
