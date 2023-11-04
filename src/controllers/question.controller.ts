import { NextFunction, Request, Response } from 'express';
import db from '../models';
import { requestedUserDetails } from '../services/user.service';

const Question: any = db.question;
const Answer: any = db.answer;
const User: any = db.user;

export const handleCreateQuestion = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { question, answer, schoolId } = req.body;
    try {
        const user = await requestedUserDetails(req)
        const response = await Question.create({
            question,
            answer,
            createdBy: user?.id,
            updatedBy: user?.id,
            schoolId
        });
        res.status(200).json(response);
    } catch (ex) {
        next(ex);
    }
};

export const handleGetQuestions = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { schoolId } = req.query;
        const where = schoolId ? { schoolId } : '';
        const response = await Question.findAll({
            where,
            include: [{
                model: Answer,
                include: {
                    model: User,
                    attributes: ['id', 'email', 'phoneNumber', 'schoolId'],
                }
            }, {
                model: User,
                attributes: ['id', 'email', 'phoneNumber', 'schoolId'],

            }],
            order: [['createdAt', 'DESC']]
        });
        res.status(200).json(response);
    } catch (ex) {
        next(ex);
    }
};
