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

export const getUserByEmailId = async (email: any, phoneNumber: any, uuid: any) => {
    let user = await User.findOne({
        where: { uuid }
    });
    if (!user) {
        // If the user does not exist, create a new one
        user = await User.create({ email, phoneNumber, uuid });
    }
    return user;
};




export const findOrCreateUser = async (filter: WhereOptions) =>
    await User.findOrCreate({ where: filter });

export const requestedUserDetails = async (req: any) => {
    const user = req?.user ? JSON.parse(JSON.stringify(req?.user)) : ''
    return user;
};
