import express from 'express';
import { ROUTES } from '../shared/constants/url';

const healthCheckRouter = express.Router();

healthCheckRouter.get(ROUTES.PING, (_req, res) => {
    res.send({ message: 'Pong' });
});

export default healthCheckRouter;
