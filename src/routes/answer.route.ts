import express from 'express';
import { ROUTES } from '../shared/constants/url';
import { handleCreateAnswer } from '../controllers/answer.controller';

const answerRouter = express.Router();
answerRouter.post(ROUTES.ADD, handleCreateAnswer);

export default answerRouter;
