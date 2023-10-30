import { WhereOptions } from 'sequelize/types';
import db from '../models';
import { getPasswordHash } from '../shared/utils/auth-utils';
const { Op } = require('sequelize');
const User: any = db.user;

export const createUser = async (
    email: string,
    password: string,
    phoneNumber: Number,
    schoolId: String,
    uuid: String,
    deviceType: String,
    userName: String
) => {
    const hashedPassword = await getPasswordHash(password);
    return await User.create({
        email,
        password: hashedPassword || '',
        phoneNumber,
        schoolId,
        uuid,
        deviceType,
        userName
    });
};

export const getAllUsers = async () => await User.findAll();

export const getUser = async (filter: WhereOptions) =>
    await User.findOne({
        where: filter,
    });

export const getUserByEmailId = async (email: string, phoneNumber: string, uuid: any) =>
    await User.findOne({
        where: {
            [Op.or]: [
                { email }, // Check if email matches
                { phoneNumber }, // Check if phonenumber matches
                { uuid }, // Check if uuid matches
            ],
        },
    });

export const findOrCreateUser = async (filter: WhereOptions) =>
    await User.findOrCreate({ where: filter });

export const requestedUserDetails = async (req: any) => {
    const user = req?.user ? JSON.parse(JSON.stringify(req?.user)) : ''
    return user;
};