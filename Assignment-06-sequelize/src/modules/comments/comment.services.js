import { Op } from 'sequelize';
import { CommentModel as Comment, PostModel as Post, UserModel as User } from '../../DB/models/index.js';
import { isExistById } from '../../utils/api-utils.js';
import catchResError from '../../utils/catch-res-error.js';

export const createBulkComments = async (req, res) => {
	try {
		const data = req.body;

		let result = null;

		const isBulk = Array.isArray(data);
		if (isBulk) {
			for (const comment of data) {
				const { content, userId, postId } = comment;

				if (!comment.content || !comment.userId || !comment.postId) {
					return res.status(400).json({ success: false, message: 'Missing required fields.' });
				}

				// if (postId) {
				// 	const user = await Comment.findByPk(postId);
				// 	if (!user) {
				// 		return res.status(404).json({ success: false, message: `Post with id ${postId} not found.` });
				// 	}
				// }

				// if (userId) {
				// 	const user = await Comment.findByPk(userId);
				// 	if (!user) {
				// 		return res.status(404).json({ success: false, message: `User with id ${userId} not found.` });
				// 	}
				// }

				// check if user id and post id exist
				await isExistById(userId, User, res, 'User');
				await isExistById(postId, Post, res, 'Post');
			}

			result = await Comment.bulkCreate(data, { validate: true });
			return res
				.status(200)
				.json({ success: true, message: `${isBulk ? 'Comments' : 'Comment'} created successfully.`, data: result });
		}

		const { content, userId, postId } = data;

		// if (!content || !userId || !postId) {
		// 	return res.status(400).json({ success: false, message: 'Missing required fields.' });
		// }

		// check if user id and post id exist
		await isExistById(userId, User, res, 'User');
		await isExistById(postId, Post, res, 'Post');

		result = await Comment.create({ content, userId, postId }, { validate: true });

		return res.status(200).json({ success: true, message: 'Comments created successfully.', data: result });
	} catch (error) {
		catchResError(error, res, true);
	}
};

export const updateComment = async (req, res) => {
	try {
		const { id } = req.params;
		const { userId, content } = req.body;

		console.log('userId', userId);

		// check if post id exist
		const comment = await isExistById(id, Comment, res, null, 'Comment not found.');

		// check if user is owner of comment
		if (comment?.userId != userId) {
			return res.status(403).json({ success: false, message: 'You are not authorized to update this comment.' });
		}

		await Comment.update({ content }, { where: { id } });
		return res.status(200).json({ success: true, message: 'Comment updated successfully.' });
	} catch (error) {
		catchResError(error, res, true);
	}
};

export const findOrCreateComment = async (req, res) => {
	try {
		const { userId, postId, content } = req.body;

		if (!content || !userId || !postId) {
			return res.status(400).json({ success: false, message: 'Missing required fields.' });
		}

		// check if post id exist
		await isExistById(postId, Post, res, 'Post');

		await isExistById(userId, User, res, 'User');

		const [comment, created] = await Comment.findOrCreate({
			where: { content, userId, postId },
			defaults: { content, userId, postId },
			validate: true,
		});

		if (created) {
			return res.status(201).json({ success: true, message: 'Comment created successfully.', data: comment });
		}

		return res.status(200).json({ success: true, message: 'Comment already exists.', data: comment });
	} catch (error) {
		catchResError(error, res, true);
	}
};

export const searchInComments = async (req, res) => {
	try {
		const { word } = req.query;

		const { rows: comments, count } = await Comment.findAndCountAll({ where: { content: { [Op.like]: `%${word}%` } } });

		if (!count) {
			return res.status(404).json({ success: false, message: 'No Comments found.' });
		}

		return res.status(200).json({ success: true, data: { count, comments } });
	} catch (error) {
		catchResError(error, res, true);
	}
};

export const getResentComments = async (req, res) => {
	try {
		const { id } = req.params;

		const data = await Comment.findAll({
			where: { postId: id },
			order: [['createdAt', 'DESC']],
			limit: 3,
		});

		return res.status(200).json({ success: true, ...(!data.length && { message: 'No comments found.' }), data });
	} catch (error) {
		catchResError(error, res, true);
	}
};

export const getCommentDetails = async (req, res) => {
	try {
		const { id } = req.params;

		const data = await Comment.findByPk(id, {
			attributes: ['id', 'content'],
			include: [
				{ model: User, as: 'user', attributes: ['id', 'name', 'email'] },
				{ model: Post, as: 'post', attributes: ['id', 'title', 'content'] },
			],
		});

		if (!data) {
			return res.status(404).json({ success: false, message: 'Comment not found.' });
		}

		return res.status(200).json({ success: true, data });
	} catch (error) {
		catchResError(error, res, true);
	}
};
