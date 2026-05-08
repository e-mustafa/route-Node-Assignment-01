import { DataTypes } from 'sequelize';
import calcAge from '../../utils/calc-age.js';
import { sequelize } from '../connection.js';

const UserModel = sequelize.define(
	'user',
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		name: {
			type: DataTypes.TEXT,
			allowNull: false,
			validate: {
				notEmpty: { msg: 'Name is required' },
				notNull: { msg: 'Name is required' },
				len: {
					args: [2, 120],
					msg: 'Name must be between 2 and 120 characters long',
				},
			},
			set(value) {
				this.setDataValue('name', value.toLowerCase().trim());
			},
			get() {
				return this.getDataValue('name').toUpperCase();
			},
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: { msg: 'Email is required' },
				notNull: { msg: 'Email is required' },
				isEmail: { msg: 'Invalid email format' },
			},
			set(value) {
				this.setDataValue('email', value.trim().toLowerCase());
			},
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: { msg: 'Password is required' },
				notNull: { msg: 'Password is required' },
				checkPasswordLength(value) {
					if (value.length < 6) {
						throw new Error('Password must be at least 6 characters long');
					}
				},
			},
		},
		role: {
			type: DataTypes.ENUM,
			values: ['USER', 'ADMIN'],
			defaultValue: 'USER',
			allowNull: false,
		},

		// additional attributes --------------------------------------------
		isAdmin: {
			type: DataTypes.VIRTUAL,
			get() {
				return this.getDataValue('role') === 'ADMIN';
			},
		},
		gender: {
			type: DataTypes.ENUM,
			values: ['MALE', 'FEMALE'],
		},
		birthdate: {
			type: DataTypes.DATE,
			validate: {
				isDate: { msg: 'birthdate must be a valid date' },
				isAfter: {
					args: ['1900-01-01'],
					msg: 'birthdate must be after 1900-01-01',
				},
				isPast(value) {
					if (new Date(value) >= new Date()) {
						throw new Error('birthdate must be in the past');
					}
				},
				isAdult() {
					const age = calcAge(this);
					if (age < 18) {
						throw new Error('User must be at least 18 years old');
					}
				},
			},
		},
		age: {
			type: DataTypes.VIRTUAL,
			get() {
				console.log('user age: ', calcAge(this));
				return calcAge(this);
			},
		},
		isVerified: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
		},
		socialId: {
			type: DataTypes.INTEGER,
		},
	},
	{
		sequelize,
		timestamps: true,
		indexes: [{ unique: true, fields: ['email'], name: 'email_index' }],
		name: { singular: 'user', plural: 'users' },
		// soft delete
		paranoid: true,
	},
);

const checkNameLength = (user) => {
	if (user.name?.length < 2) {
		throw new Error('Content must be at least 2 characters long');
	}
};

// ensure the name of the user is greater than 2 characters.
UserModel.beforeCreate('checkNameLength', checkNameLength);

export default UserModel;
