import cors from 'cors';
import createDebug from 'debug';
import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import { errorMiddleware } from './middleware/error.middleware.js';
import { userRouter } from './routes/user.routes.js';
import { HttpError } from './types/http.error.js';

const debug = createDebug('V25:App');
export const app = express();

debug('Started');

app.use(morgan('dev'));
app.use(cors());

app.use(express.json());
app.use(express.static('public'));

app.use((req: Request, res: Response, next: NextFunction) => {
  next();
});

app.get('/', (req: Request, res: Response) => {
  debug('Hola Mundo');
  res.write('<h1>Champions and Films </h1>');
  res.end();
});

app.use('/users', userRouter);

app.use('/:id ', (req: Request, res: Response, next: NextFunction) => {
  const error = new HttpError(418, 'I am a teapot', 'Invalid router');
  next(error);
});

app.use(errorMiddleware);
