import { Request, Response, NextFunction } from 'express';

interface BadJsonError extends SyntaxError {
    status?: number;
    body?: any;
}

export default function errorHandlerMiddleware(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) {
    const error = err as BadJsonError;
    if (error instanceof SyntaxError && error.status === 400 && 'body' in error) {
        console.error('JSON inválido recibido:', error);
        return res.status(400).json({ error: 'JSON inválido' });
    }
    next(err);
}
