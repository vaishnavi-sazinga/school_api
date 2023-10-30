import { NextFunction, Request, Response } from 'express';
import HTTPResponse from '../interfaces/http-response.success';
import {
    getUserByEmailId,
} from '../services/user.service';
import { InvalidCredentialsError } from '../shared/errors/invalid-credentials.error';
import {
    // comparePassword,
    generateAccessToken,
    generateRefreshToken,
    verifyRefreshToken,
} from '../shared/utils/auth-utils';


export const handleSignInViaEmailIdPassword = async (
    req: Request,
    res: Response<HTTPResponse>,
    next: NextFunction
) => {
    try {
        const user = await getUserByEmailId(req.body.email, req.body.phoneNumber,req.body.uuid);

        if (!user) {
            throw new InvalidCredentialsError('Invalid email or phonenumber');
        }

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        res.status(200).json({
            data: {
                accessToken,
                refreshToken,
                user
            },
        });
    } catch (ex) {
        next(ex);
    }
};

export const refreshAccessToken = (
    req: Request,
    res: Response<HTTPResponse>,
    next: NextFunction
) => {
    try {
        const { refreshToken } = req.body;
        const tokenDetails: any = verifyRefreshToken(refreshToken);
        const accessToken = generateAccessToken({ id: tokenDetails.userId });
        res.status(200).json({
            data: {
                accessToken,
            },
        });
    } catch (ex) {
        next(ex);
    }
};
