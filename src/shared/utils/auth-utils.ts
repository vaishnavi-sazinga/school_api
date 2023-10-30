import {
    scrypt,
    randomBytes,
    createHash,
    createCipheriv,
    createDecipheriv,
} from 'crypto';
import { promisify } from 'util';
import JWT, { Secret } from 'jsonwebtoken';
import otpGenerator from 'otp-generator';
import {
    AUTH_ENC_ALGO,
    AUTH_ENC_IV,
    AUTH_OTP_ENC_KEY,
    AUTH_OTP_EXPIRY_SECONDS,
    JWT_ACCESS_TOKEN_EXPIRY_SECONDS,
    JWT_ISSUER,
    JWT_REFRESH_TOKEN_EXPIRY_SECONDS,
    JWT_SECRET_FOR_ACCESS_TOKEN,
    JWT_SECRET_FOR_REFRESH_TOKEN,
} from '../../config/env.config';

const scryptAsync = promisify(scrypt);

export const getPasswordHash = async (password: string) => {
    const salt = randomBytes(8).toString('hex');
    const buf = (await scryptAsync(password, salt, 64)) as Buffer;
    return `${buf.toString('hex')}.${salt}`;
};

export const comparePassword = async (
    storedPassword: string,
    suppliedPassword: string
) => {
    const [hashedPassword, salt] = storedPassword.split('.');
    const buf = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer;
    return buf.toString('hex') === hashedPassword;
};

export const generateToken = (
    user: any,
    secret: JWT.Secret,
    expiresIn: number
) => {
    const payload = {
        userId: user.id,
    };
    const options: JWT.SignOptions = {
        algorithm: 'HS256',
        expiresIn,
        issuer: JWT_ISSUER,
    };
    const token = JWT.sign(payload, secret, options);
    return token;
};

export const generateAccessToken = (user: any) =>
    generateToken(
        user,
        String(JWT_SECRET_FOR_ACCESS_TOKEN),
        JWT_ACCESS_TOKEN_EXPIRY_SECONDS
    );

export const generateRefreshToken = (user: any) =>
    generateToken(
        user,
        String(JWT_SECRET_FOR_REFRESH_TOKEN),
        JWT_REFRESH_TOKEN_EXPIRY_SECONDS
    );

export const verifyRefreshToken = (refreshToken: string) => {
    const privateKey: Secret = String(JWT_SECRET_FOR_REFRESH_TOKEN);
    const tokenDetails = JWT.verify(refreshToken, privateKey);
    return tokenDetails;
};

const iv = Buffer.from(<any>AUTH_ENC_IV);
const ivString = iv.toString('hex');

const getSha1 = (input: Buffer) => createHash('sha1').update(input).digest();

function getPasswordDeriveBytes(
    salt: string,
    iterations: number,
    len: number
) {
    let key = Buffer.from(AUTH_OTP_ENC_KEY + salt);
    for (let i = 0; i < iterations; i++) {
        key = getSha1(key);
    }
    if (key.length < len) {
        const hx = getPasswordDeriveBytes(salt, iterations - 1, 20);
        for (let counter = 1; key.length < len; ++counter) {
            key = Buffer.concat([
                key,
                getSha1(Buffer.concat([Buffer.from(counter.toString()), hx])),
            ]);
        }
    }
    return Buffer.alloc(len, key);
}

export const encode = (string: string) => {
    const key = getPasswordDeriveBytes('', 100, 32);
    const cipher = createCipheriv(AUTH_ENC_ALGO, key, ivString);
    const part1 = cipher.update(string, 'utf8');
    const part2 = cipher.final();
    const encrypted = Buffer.concat([part1, part2]).toString('base64');
    return encrypted;
};

export const decode = (string: string) => {
    const key = getPasswordDeriveBytes('', 100, 32);
    const decipher = createDecipheriv(AUTH_ENC_ALGO, key, ivString);
    let decrypted = decipher.update(string, 'base64', 'utf8');
    decrypted += decipher.final();
    return decrypted;
};

export const generateOTP = () => {
    const otp = otpGenerator.generate(6, {
        digits: true,
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false,
    });
    const expiry = new Date();
    expiry.setSeconds(expiry.getSeconds() + AUTH_OTP_EXPIRY_SECONDS);
    return {
        otp,
        expiry,
    };
};
