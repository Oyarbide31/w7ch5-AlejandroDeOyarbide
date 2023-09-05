import { NextFunction, Request, Response } from 'express';
import { UserMongoRepository } from '../repository/user.mongo.repository.js';
import { Auth } from '../services/auth.js';
import { HttpError } from '../types/http.error.js';

export class AuthInterceptor {
  authorization(req: Request, _res: Response, next: NextFunction) {
    try {
      const token = req.get('Authorization')?.split(' ')[1];
      if (!token) {
        throw new HttpError(498, 'Invalid token', 'No token provided');
      }

      const { id } = Auth.verifyJWTGettingPayLoad(token);
      req.body.validatedId = id;

      next();
    } catch (error) {
      next(error);
    }
  }

  async usersAuthentication(req: Request, _res: Response, next: NextFunction) {
    const userID = req.body.validatedId;

    try {
      const usersRepo = new UserMongoRepository();
      const user = await usersRepo.getById(userID);
      if (!user) {
        const error = new HttpError(403, 'Forbidden');
        next(error);
      }

      next();
    } catch (error) {
      next(error);
    }
  }
}
