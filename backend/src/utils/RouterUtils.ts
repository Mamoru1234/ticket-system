import { Response, Request, NextFunction } from 'express';
import { LoggerUtils } from './LoggerUtils';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { AppError } from '../errors/app.error';

const logger = LoggerUtils.getLogger(__filename);

export function asyncHandler(handler: (req: Request, res: Response) => Promise<void>) {
  return (req: Request, res: Response) => {
    handler(req, res)
      .catch((e) => {
      logger.info('Error in handler: ', e);
      if (e instanceof AppError) {
        res.status(e.statusCode).json(e.body);
        return;
      }
      res.status(500).json({
        message: 'unknown error',
      });
    });
  }
}

export function validateBody(clazz: any) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const instance = plainToClass(clazz, req.body);
    validate(instance, { whitelist: true, forbidNonWhitelisted: true }).then((e) => {
      if (e.length) {
        res.status(400).json({
          errors: e,
        });
        return;
      }
      next();
    })
  }
}
