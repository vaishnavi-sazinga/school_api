import express from 'express';
import { ROUTES } from '../shared/constants/url';
import { handleCreateQuestion, handleGetQuestions } from '../controllers/question.controller';

const questionRouter = express.Router();

questionRouter.post(ROUTES.ADD, handleCreateQuestion);
questionRouter.get(ROUTES.GET, handleGetQuestions);

export default questionRouter;
