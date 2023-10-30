import { DataTypes, Sequelize } from 'sequelize';
import { auditColumns } from '../shared/utils/sequelize-model-helper';

/* eslint @typescript-eslint/no-unused-vars: "off" */
const UserModel = (sequelize: Sequelize, _Sequelize: any) => {
    const User = sequelize.define(
        'Users',
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            email: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: true,
            },
            phoneNumber: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: true,
            },
            schoolId: {
                type: DataTypes.STRING,
            },
            password: {
                type: DataTypes.STRING,
            },
            uuid: {
                type: DataTypes.STRING,
            },
            deviceType: {
                type: DataTypes.STRING,
            },
            userName: {
                type: DataTypes.STRING,
            },
            ...auditColumns,
        },
        {
            defaultScope: {
                attributes: { exclude: ['password'] },
            },
            scopes: {
                withPassword: {
                    attributes: { exclude: [] },
                },
            },
            hooks: {
                afterCreate: (record: any) => {
                    /* eslint no-param-reassign: "off" */
                    delete record.dataValues.password;
                },
                afterUpdate: (record: any) => {
                    /* eslint no-param-reassign: "off" */
                    delete record.dataValues.password;
                },
            },
        }
    );
    return User;
};

export default UserModel;
