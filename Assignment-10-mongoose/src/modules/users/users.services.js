import User from '../../DB/models/user.model.js';
import { throwException } from '../../utils/response/throw.exceptions.js';

export async function createUserService({ name, email, password, phone, age }) {
	if (!name || !email || !password || !phone) {
		throwException(400, 'User information required, name, email, password and phone');
		// throw new AppError(400, 'User information required, name, email, password and phone');
	}

	const userExist = await User.findOne({ email });
	if (userExist) {
		throwException(409, 'Email already exist.');
	}

	const newUser = await User.create({ name, email, password, phone, age });

	const user = newUser.toObject();
	delete user.password;

	return user;
}

export async function loginUserService({ email, password }) {
	if (!email || !password) {
		throwException(400, 'User information required, email and password');
	}

	const user = await User.findOne({ email, password }, '-password');
	if (!user) {
		throwException(401, 'Invalid email or password.');
	}

	return user;
}

export async function updateUserService(id, { name, email, phone, age }) {
	if (!id) {
		throwException(400, 'please provide user id');
	}

	if (!name && !email && !phone && !age) {
		throwException(400, 'User information required, name, email, age or phone');
	}

	const user = await User.findById(id);
	if (!user) {
		throwException(404, 'User not found!');
	}

	if (email && email !== user.email) {
		const userExist = await User.findOne({ email });
		if (userExist) {
			throwException(409, 'Email already exist.');
		}
	}

	// await user.updateOne({ name, email, phone, age }, { runValidators: true });

	const updatedUser = await User.findByIdAndUpdate(
		id,
		{ name, email, phone, age },
		{ returnDocument: 'after', runValidators: true },
	).select('-password');

	if (!updatedUser) throwException(404, 'user not found!');

	return updatedUser;
}

export async function deleteUserService(id) {
	if (!id) {
		throwException(400, 'Please provide user id');
	}

	// const deleted = await User.findByIdAndDelete(id);
	const deleted = await User.deleteOne({ _id: id });
	if (!deleted?.deletedCount) {
		throwException(404, 'user not found!');
	}

	return deleted;
}

export async function getUserService(id) {
	if (!id) {
		throwException(400, 'Please provide user id');
	}

	const user = await User.findById(id).select('-password -__v'); // get data without password & version
	if (!user) {
		throwException(404, 'user not found!');
	}

	return user;
}

export async function getUsersService() {
	return await User.find({}).select('-password -__v'); // get data without password & version
}
