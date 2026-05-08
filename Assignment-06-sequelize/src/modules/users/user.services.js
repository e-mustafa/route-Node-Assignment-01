import { Op } from 'sequelize';
import { isDev } from '../../configs/env.js';
import { UserModel as User } from '../../DB/models/index.js';
import catchResError from '../../utils/catch-res-error.js';

export const getAllUsers = async (req, res) => {
	try {
		const users = await User.findAll({
			attributes: { exclude: ['password', 'role', 'deletedAt'] },
		});
		return res.status(200).json({ success: true, message: 'Users fetched successfully.', data: users });
	} catch (error) {
		isDev && console.log(error);
		return res.status(500).json({
			success: false,
			message: error?.message || 'Internal Server Error',
			...(isDev && { error: error?.stack }),
		});
	}
};

export const addUser = async (req, res) => {
	try {
		const { name, email, password, gender, birthdate } = req.body;

		// using findOrBuild -------------------------------
		// const [user, created] = await User.findOrBuild({
		// 	where: { email: req.body.email },
		// 	defaults: req.body,
		// });

		// if (!created) {
		// 	return res.status(409).json({ success: false, message: 'This email already exist' });
		// }

		// or find then build ---------------------------------------------------
		const isExist = await User.findOne({ where: { email } });
		if (isExist) {
			return res.status(409).json({ success: false, message: 'This email already exist' });
		}
		const user = await User.build(name, email, password, gender, birthdate);

		await user.save();

		return res.status(201).json({ success: true, message: 'User added successfully.', data: user });
	} catch (error) {
		catchResError(error, res, true);
	}
};

export const createOrUpdateUser = async (req, res) => {
	try {
		const { id } = req.params;
		const { name, email, password, gender, birthdate } = req.body;

		const isExist = await User.findOne({ where: { email, id: { [Op.ne]: id } } });
		if (isExist) {
			return res.status(409).json({ success: false, message: 'This email already exist' });
		}

		const [userInstance, created] = await User.upsert(
			{ id, name, email, password, gender, birthdate },
			{
				validate: false, // skip validation
			},
		);

		const { password: _, role, ...user } = userInstance.get({ plain: true });

		return res.status(created ? 201 : 200).json({
			success: true,
			// message: created ? 'User created successfully.' : 'User updated successfully.',
			message: `User ${created ? 'created' : 'updated'} successfully`,
			data: user,
		});
	} catch (error) {
		catchResError(error, res, true);
	}
};

export const getUserByEmail = async (req, res) => {
	const { email } = req.query;

	try {
		const user = await User.findOne({
			where: { email },
			attributes: { exclude: ['password', 'deletedAt'] },
		});

		if (!user) {
			return res.status(404).json({ success: false, message: 'User not found' });
		}

		return res.status(200).json({ success: true, data: user });
	} catch (error) {
		catchResError(error, res);
	}
};

export const getUserById = async (req, res) => {
	const { id } = req.params;
	try {
		const user = await User.findByPk(id, {
			attributes: { exclude: ['role', 'password', 'deletedAt'] },
		});

		if (!user) {
			return res.status(404).json({ success: false, message: 'User not found.' });
		}

		return res.status(201).json({ success: true, data: user });
	} catch (error) {
		catchResError(error, res);
	}
};

export const updateUser = async (req, res) => {
	try {
		const { id } = req.params;
		const { name, email, password, gender, birthdate } = req.body;

		console.log('id: ', id);

		const isExist = await User.findByPk(id);
		if (!isExist) {
			return res.status(404).json({ success: false, message: 'User not found' });
		}
		console.log('id: ', id);

		if (email) {
			const isEmailExist = await User.findOne({ where: { email, id: { [Op.ne]: id } } });
			if (isEmailExist) {
				return res.status(409).json({ success: false, message: 'This email already exist' });
			}
		}

		const {
			dataValues: { password: _, role, ...user },
		} = await isExist.update({ name, email, password, gender, birthdate }, { where: { id } });

		return res.status(200).json({ success: true, message: 'User updated successfully.', data: user });
	} catch (error) {
		catchResError(error, res, true);
	}
};

export const deleteUser = async (req, res) => {
	try {
		const { id } = req.params;

		const isExist = await User.findByPk(id);
		if (!isExist) {
			return res.status(404).json({ success: false, message: 'User not found' });
		}

		const deleted = await User.destroy({ where: { id } });

		return res.status(200).json({ success: true, message: 'User deleted successfully.' });
	} catch (error) {
		catchResError(error, res, true);
	}
};
