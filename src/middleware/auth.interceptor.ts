import createDebug from 'debug';
import { NextFunction, Request, Response } from 'express';
import { Auth } from '../services/auth.js';

const debug = createDebug('W6E:Middleware:Auth.Interceptor');
export class AuthInterceptor {
  static authorization: any;
  authorization(req: Request, _res: Response, next: NextFunction) {
    debug('Call interceptor');

    try {
      const token = req.get('Authorization')?.split(' ')[1];
      if (!token) {
        throw new Error();
      }

      const { id } = Auth.verifyJWTGettingPayLoad(token);
      req.body.validatedId = id;
      next();
    } catch (error) {
      next(error);
    }
  }

  authentication(req: Request, _res: Response, next: NextFunction) {
    debug('Call interceptor');

    try {
      const token = req.get('Authorization')?.split(' ')[1];
      if (!token) {
        throw new Error();
      }

      const { id } = Auth.verifyJWTGettingPayLoad(token);
      req.body.validatedId = id;
      next();
    } catch (error) {
      next(error);
    }
  }
}
