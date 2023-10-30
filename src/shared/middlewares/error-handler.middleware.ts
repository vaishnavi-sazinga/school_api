import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../errors/custom.error';

export function errorHandler(
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
): void {
    console.error(
        '\x1b[31m%s\x1b[0m',
        '############################################################'
    );
    console.error('\x1b[31m%s\x1b[0m', err);
    console.error(
        'URL: ',
        req.url,
        '\nPARAMS: ',
        req.params,
        '\nQUERY-STRING: ',
        req.query,
        '\nHEADERS: ',
        req.headers,
        '\nBODY: ',
        req.body
    );
    console.error(
        '\x1b[31m%s\x1b[0m',
        '############################################################'
    );

    if (err) {
        if (err instanceof CustomError) {
            res.status(err.statusCode).send({ error: err.serializeErrors() });
        } else {
            res.status(err.status || 500).send({
                error: {
                    message:
                        err.message || 'Internal server error, try again later',
                },
            });
        }
    }
    next(err);
}
