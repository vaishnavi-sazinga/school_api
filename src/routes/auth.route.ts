import express from 'express';
import {
    handleSignInViaEmailIdPassword,
    refreshAccessToken,
} from '../controllers/auth.controller';
import { ROUTES } from '../shared/constants/url';

const authRouter = express.Router();

authRouter.post(ROUTES.TOKEN, handleSignInViaEmailIdPassword);
authRouter.post(ROUTES.TOKEN_REFRESH, refreshAccessToken);

export default authRouter;
