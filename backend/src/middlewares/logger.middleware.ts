import { LoggerUtils } from '../utils/LoggerUtils';
import { Request, Response, NextFunction} from 'express';

const logger = LoggerUtils.getLogger(__filename);

export function loggerMiddleware(req: Request, _res: Response, next: NextFunction): void {
  logger.info(req.method, req.url);
  next();
}
