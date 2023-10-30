import { NextFunction, Request, Response } from 'express';
import db from '../models';
import { requestedUserDetails } from '../services/user.service';

const Answer: any = db.answer;

export const handleCreateAnswer = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { questionId, answer } = req.body;
    try {
        const user = await requestedUserDetails(req)
        const response = await Answer.create({
            questionId,
            answer,
            createdBy: user?.id,
            updatedBy: user?.id
        });
        res.status(200).json(response);
    } catch (ex) {
        next(ex);
    }
};
