import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { HttpError } from '../types/http.error.js';
import { TokenPayLoad } from '../types/token.js';

export class Auth {
  private static secret = process.env.TOKEN_SECRET!; // Aki se saca el dato de env

  static hash(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }

  static compare(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  static signJWT(payload: TokenPayLoad): string {
    const token = jwt.sign(payload, Auth.secret);
    return token;
  }

  static verifyJWTGettingPayLoad(token: string): TokenPayLoad {
    try {
      const result = jwt.verify(token, Auth.secret);
      if (typeof result === 'string') {
        throw new HttpError(498, 'Invalid Token', result);
      }

      return result as TokenPayLoad;
    } catch {
      throw new HttpError(498, 'Invalid Token');
    }
  }
}

/*
En auth:
se proporcionan metodos para realizar operacioens que tienen que ver con
la autenticación y la autorización en una aplicación.

Se proporcioan metodos para el hashing y la comparación de contraseñas,
así como para firmar y verificar tokens JWT, algo util para la autenticación
y autorización de usuarios en una aplicación. También utiliza una clave secreta
almacenada en la variable Auth.secret para realizar operaciones con tokens JWT
de manera segura.


*/
