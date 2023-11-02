import { DataTypes, Sequelize } from 'sequelize';
import { auditColumns } from '../shared/utils/sequelize-model-helper';

/* eslint @typescript-eslint/no-unused-vars: "off" */
const AnswerModel = (sequelize: Sequelize, _Sequelize: any) => {
    const Answer = sequelize.define(
        'Answers',
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            questionId: {
                type: DataTypes.INTEGER,
            },
            answer: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            schoolId: {
                type: DataTypes.STRING,
            },
            ...auditColumns,
        }
    );
    return Answer;
};

export default AnswerModel;
