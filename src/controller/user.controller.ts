import createDebug from 'debug';
import { NextFunction, Request, Response } from 'express';
import { User, UserLoginData } from '../model/user.js';
import { Repository } from '../repository/repository.js';
import { Auth } from '../services/auth.js';
import { HttpError } from '../types/http.error.js';
import { TokenPayLoad } from '../types/token.js';
import { Controller } from './controller.js';

const debug = createDebug('V25:Controller: UserController');

export class UserController extends Controller<User> {
  constructor(protected repo: Repository<User>) {
    super(repo);
    debug('Instantiated');
  }

  async login(req: Request, res: Response, next: NextFunction) {
    const { userName, passwd } = req.body as unknown as UserLoginData;
    const error = new HttpError(401, 'Unauthorized', 'Login Unauthorized');
    try {
      if (!this.repo.search) return;
      const data = await this.repo.search({ key: 'userName', value: userName });
      if (!data.length) {
        throw error;
      }

      const user = data[0];
      if (!(await Auth.compare(passwd, user.passwd))) {
        throw error;
      }

      const payload: TokenPayLoad = {
        id: user.id,
        userName: user.userName,
      };

      const token = Auth.signJWT(payload);
      res.json({ user, token });
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      req.body.password = await Auth.hash(req.body.password);
      const newUser = await this.repo.create(req.body);
      res.status(201);
      res.json(newUser);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const updatedUser = await this.repo.update(req.params.id, req.body);
      res.json(updatedUser);
    } catch (error) {
      next(error);
    }
  }
}

/*
Esto es un controlador de usuario en una que maneja las operaciones
relacionadas con los usuarios, como inicio de sesión, creación y
actualización, y utiliza una interfaz Repository para interactuar
con una fuente de datos subyacente, así como un servicio de autenticación
Auth para la gestión de la autenticación de usuarios.
*/
