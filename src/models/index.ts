import { Sequelize } from 'sequelize';
import config from '../config/db.config';
import UserModel from './user.model';
import QuestionModel from './question.model';
import AnswerModel from './answer.model';

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: <any>0,
    pool: {
        max: config.pool.max,
        min: config.pool.min,
        acquire: config.pool.acquire,
        idle: config.pool.idle,
    },
});
const db = {
    Sequelize,
    sequelize,
    user: UserModel(sequelize, Sequelize),
    question: QuestionModel(sequelize, Sequelize),
    answer: AnswerModel(sequelize, Sequelize),
};

db.question.hasMany(db.answer, { foreignKey: 'questionId', });
db.question.belongsTo(db.user, { targetKey: 'id', foreignKey: 'createdBy', });
db.answer.belongsTo(db.user, { targetKey: 'id', foreignKey: 'createdBy', });
// db.user.sync({ alter: true }).then((res: any) => console.log(res)).catch((error: any) => console.log(error));
export default db;
