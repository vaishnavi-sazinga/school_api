import express from 'express';
import { handleCreateUser } from '../controllers/user.controller';
import { ROUTES } from '../shared/constants/url';

const userRouter = express.Router();

userRouter.post(ROUTES.ADD, handleCreateUser);

export default userRouter;
