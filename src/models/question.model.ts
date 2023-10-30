import { DataTypes, Sequelize } from 'sequelize';
import { auditColumns } from '../shared/utils/sequelize-model-helper';

/* eslint @typescript-eslint/no-unused-vars: "off" */
const QuestionModel = (sequelize: Sequelize, _Sequelize: any) => {
    const Question = sequelize.define(
        'Questions',
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            question: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            answer: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            ...auditColumns,
        }
    );
    return Question;
};

export default QuestionModel;
