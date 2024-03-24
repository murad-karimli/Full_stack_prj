import { Request, Response, NextFunction } from 'express';
import { ErrorBase } from '../helpers/errorHandler'; 

export const errorHandler = (
    err: ErrorBase<any>,
    req: Request,
    res: Response,
    next: NextFunction
) => {

    console.error(err);

    
    res.status(err.statusCode || 500).json({
        error: {
            name: err.name,
            message: err.message,
            statusCode:err.statusCode
        }
    });
};
