import express from 'express';
import cors from 'cors';
import passport from 'passport';
import { BASE_ROUTES, BASE_URL } from './shared/constants/url';
import healthCheckRouter from './routes/health-check.route';
import { jwtStrategy } from './shared/utils/jwt-strategy';
import authRouter from './routes/auth.route';
import userRouter from './routes/user.route';
import verifyAuth from './shared/middlewares/verify-auth.middleware';
import { errorHandler } from './shared/middlewares/error-handler.middleware';
import questionRouter from './routes/question.route';
import answerRouter from './routes/answer.route';

const app = express();

const corsOptions = {
    origin: '*',
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

passport.use(jwtStrategy);
app.use(passport.initialize());

app.get(BASE_URL, (req: any, res: any) => {
    res.json({ message: 'Welcome!' });
});

app.use(BASE_ROUTES.HEALTH_CHECK, healthCheckRouter);
app.use(BASE_ROUTES.AUTH, authRouter);
app.use(BASE_ROUTES.USERS, userRouter);
app.use(BASE_ROUTES.QUESTIONS, verifyAuth, questionRouter);
app.use(BASE_ROUTES.ANSWERS, verifyAuth, answerRouter);

app.use(errorHandler);

export { app };
