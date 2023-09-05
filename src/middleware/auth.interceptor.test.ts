import { Request, Response } from 'express';
import { User } from '../model/user.js';
import { Repository } from '../repository/repository.js';
import { Auth } from '../services/auth.js';
import { HttpError } from '../types/http.error.js';
import { AuthInterceptor } from './auth.interceptor.js';

jest.mock('../services/auth.js');

describe('Given AuthInterceptor', () => {
  const interceptor = new AuthInterceptor();
  describe('When we instantiate it ', () => {
    test('authorization should be used without errors', () => {
      const mockRequest = {
        get: jest.fn().mockReturnValue('Bearer soy_el_token'),
        body: {},
      } as unknown as Request;
      const mockResponse = {} as Response;
      const mockNext = jest.fn();

      Auth.verifyJWTGettingPayLoad = jest.fn().mockReturnValue({
        id: '1',
      });

      interceptor.authorization(mockRequest, mockResponse, mockNext);
      expect(mockNext).toHaveBeenCalledWith();
    });
    test('authorization should be used with errors', () => {
      const mockRequest = {
        get: jest.fn().mockReturnValue(''),
        body: {},
      } as unknown as Request;
      const mockResponse = {} as Response;
      const mockNext = jest.fn();

      const mockError = new HttpError(
        498,
        'Invalid token',
        'No token provided'
      );

      Auth.verifyJWTGettingPayLoad = jest.fn().mockReturnValue({
        id: '1',
      });

      interceptor.authorization(mockRequest, mockResponse, mockNext);
      expect(mockNext).toHaveBeenCalledWith(mockError);
    });
    test('usersAuthentication should be used with errors', async () => {
      const mockData = {
        id: '1',
        userName: 'Alejandro',
        email: 'alejandro@hotmail.com',
        password: '12345',
        firstName: 'Alejandro',
        lastName: 'Agui',
        enemies: [],
        friends: [],
      };
      const mockRequest = {
        body: {
          validatedId: '1',
        },
      } as unknown as Request;
      const mockResponse = {} as Response;
      const mockNext = jest.fn();
      const mockRepo: Repository<User> = {
        getAll: jest.fn(),
        getById: jest.fn(),
        search: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
        create: jest.fn(),
      };
      (mockRepo.getById as jest.Mock).mockResolvedValue(mockData);
      await interceptor.authentication(mockRequest, mockResponse, mockNext);
      expect(mockNext).toHaveBeenCalled();
    });
    test('usersAuthentication should be used with errors', async () => {
      const mockRepo: Repository<User> = {
        getAll: jest.fn().mockRejectedValue(new Error('GetAll error')),
        getById: jest.fn().mockRejectedValue(new Error('Get error')),
        search: jest.fn().mockRejectedValue(new Error('Post error')),
        update: jest.fn().mockRejectedValue(new Error('Patch error')),
        delete: jest.fn().mockRejectedValue(new Error('Delete error')),
        create: jest.fn().mockRejectedValue(new Error('Search error')),
      };
      (mockRepo.getById as jest.Mock).mockResolvedValue(undefined);
      const mockRequest = {
        body: {
          validatedId: '1',
        },
      } as unknown as Request;
      const mockResponse = {} as Response;
      const mockNext = jest.fn();
      await interceptor.authentication(mockRequest, mockResponse, mockNext);
      expect(mockNext).toHaveBeenCalled();
    });
  });
});
