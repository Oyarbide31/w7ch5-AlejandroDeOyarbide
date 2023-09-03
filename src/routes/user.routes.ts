import createDebug from 'debug';
import { Router as createRouter } from 'express';
import { UserController } from '../controller/user.controller.js';
import { AuthInterceptor } from '../middleware/auth.interceptor.js';
import { UserMongoRepository } from '../repository/user.mongo.repository.js';

const debug = createDebug('V25:Router: UserRouter');

debug('Loaded');

const repo = new UserMongoRepository();
const userController = new UserController(repo);
export const userRouter = createRouter();

userRouter.get(
  '/',
  AuthInterceptor.authorization(AuthInterceptor),
  userController.getAll.bind(userController)
);
userRouter.get(
  '/:id',
  AuthInterceptor.authorization(AuthInterceptor),
  userController.getById.bind(userController)
);

userRouter.post('/register', userController.create.bind(userController));

userRouter.patch('/login', userController.login.bind(userController));

userRouter.patch(
  '/:id',
  AuthInterceptor.authorization.bind(AuthInterceptor),
  userController.update.bind(userController)
);

userRouter.delete(
  '/:id',
  AuthInterceptor.authorization.bind(AuthInterceptor),
  userController.delete.bind(userController)
);
