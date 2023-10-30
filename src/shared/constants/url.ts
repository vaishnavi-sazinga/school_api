export const EMPTY_ROUTE = '/';
export const BASE_URL = '/v1/';

export const BASE_ROUTES = {
    HEALTH_CHECK: `${BASE_URL}healthcheck`,
    AUTH: `${BASE_URL}auth`,
    USERS: `${BASE_URL}users`,
    QUESTIONS: `${BASE_URL}questions`,
    ANSWERS: `${BASE_URL}answers`,
};

export const ROUTES = {
    PING: '/ping',
    TOKEN: '/token',
    ADD: '/add',
    GET: '/get',
    OTP_VERIFY: '/otp/verify',
    TOKEN_REFRESH: '/token/refresh',
};
