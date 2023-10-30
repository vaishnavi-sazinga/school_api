import { Strategy, ExtractJwt } from 'passport-jwt';
import { getUser } from '../../services/user.service';
import { JWT_SECRET_FOR_ACCESS_TOKEN } from '../../config/env.config';

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET_FOR_ACCESS_TOKEN,
};

export const jwtStrategy = new Strategy(
    opts,
    async (jwt_payload: any, next: any) => {
        const { userId } = jwt_payload;
        const user = await getUser({ id: userId });
        if (user) {
            next(null, user);
        } else {
            next(null, false);
        }
    }
);
