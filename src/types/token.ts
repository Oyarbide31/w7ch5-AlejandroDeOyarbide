import { JwtPayload } from 'jsonwebtoken';

export type TokenPayLoad = JwtPayload & {
  id: string;
  userName: string;
};

/*
El typo TokenPayload define la estructura de los datos del cuerpo
(payload) de un token JWT tras su decodificación. Lo que facilita
la tipificación de los datos cuando se trabajan con tokens JWT

Además se puede acceder a las propiedades específicas del token de una
manera segura y con autocompletado de TypeScript. */
