import { Request, Response } from 'express';
import { UserMongoRepository } from '../repository/user.mongo.repository';
import { Auth } from '../services/auth';
import { UserController } from './user.controller.js';

describe('Given the class UserController', () => {
  describe('When it is instantiated', () => {
    const mockRepo: UserMongoRepository = {
      getAll: jest.fn(),
      getById: jest.fn(),
      search: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };
    const userController = new UserController(mockRepo);

    test('Then, we use the getAll() method', async () => {
      const mockData = [{ id: '1', name: 'Alex' }];
      (mockRepo.getAll as jest.Mock).mockResolvedValueOnce(mockData);
      const mockRequest = {} as Request;
      const mockResponse = {
        json: jest.fn(),
      } as unknown as Response;
      const mockNext = jest.fn();

      await userController.getAll(mockRequest, mockResponse, mockNext);
      expect(mockRepo.getAll).toHaveBeenCalledWith();
      expect(mockResponse.json).toHaveBeenCalledWith(mockData);
    });

    test('Then we use the getbyId() method', async () => {
      const mockData = [{ id: '1', name: 'Alex' }];
      (mockRepo.getById as jest.Mock).mockResolvedValueOnce(mockData);
      const mockRequest = { params: { id: '1' } } as unknown as Request;
      const mockResponse = { json: jest.fn() } as unknown as Response;
      const mockNext = jest.fn();

      await userController.getById(mockRequest, mockResponse, mockNext);
      expect(mockRepo.getById).toHaveBeenCalled();
      expect(mockResponse.json).toHaveBeenCalledWith(mockData);
    });

    test('Then, we use create() method', async () => {
      const mockedData = {
        userName: 'Alex',
        passwd: '1234',
        email: 'alejandro8@gmail.com',
        firstName: 'Alejandro',
        lastName: 'de Oyarbide',
      };
      (mockRepo.create as jest.Mock).mockResolvedValueOnce(Promise<void>);
      const mockRequest = { body: mockedData } as unknown as Request;
      Auth.hash = jest.fn().mockResolvedValue('');
      const mockResponse = {
        json: jest.fn(),
        status: Number,
      } as unknown as Response;
      const mockNext = jest.fn();

      await userController.create(mockRequest, mockResponse, mockNext);
      expect(mockRepo.create).toHaveBeenCalled();
      expect(mockResponse.json).toHaveBeenCalled();
    });

    test('Then, we use metod update() ', async () => {
      const mockedUser = {
        userName: 'Alex',
        passwd: '1234',
        email: 'alejandro8@gmail.com',
        firstName: 'Alejandro',
        lastName: 'de Oyarbide',
      };
      (mockRepo.update as jest.Mock).mockResolvedValueOnce(mockedUser);
      const mockRequest = { params: { id: '1' } } as unknown as Request;
      const mockResponse = { json: jest.fn() } as unknown as Response;
      const mockNext = jest.fn();

      await userController.update(mockRequest, mockResponse, mockNext);
      expect(mockRepo.update).toHaveBeenCalled();
      expect(mockResponse.json).toHaveBeenCalledWith(mockedUser);
    });

    test('Then, we use delete() method', async () => {
      const mockedUserDelete = {
        userName: 'Alex',
        passwd: '1234',
        email: 'alejandro8@gmail.com',
        firstName: 'Alejandro',
        lastName: 'de Oyarbide',
      };
      (mockRepo.delete as jest.Mock).mockResolvedValueOnce(mockedUserDelete);
      const mockRequest = { params: { id: '1' } } as unknown as Request;
      const mockResponse = {
        json: jest.fn(),
        status: jest.fn(),
      } as unknown as Response;
      const mockNext = jest.fn();

      await userController.delete(mockRequest, mockResponse, mockNext);
      expect(mockRepo.delete).toHaveBeenCalled();
    });

    describe('When there are errors callings methods', () => {
      const mockRepo: UserMongoRepository = {
        getAll: jest.fn().mockRejectedValueOnce(new Error('GetAll Error')),
        getById: jest.fn().mockRejectedValueOnce(new Error('GetById Error')),
        create: jest.fn().mockRejectedValueOnce(new Error('Create Error')),
        update: jest.fn().mockRejectedValueOnce(new Error('Update Error')),
        delete: jest.fn().mockRejectedValueOnce(new Error('Delete Error')),
      } as unknown as UserMongoRepository;
      const userController = new UserController(mockRepo);

      test('Then, when we call to getAll() and we have one error', async () => {
        const mockRequest = {} as Request;
        const mockResponse = { json: jest.fn() } as unknown as Response;
        const mockNext = jest.fn();

        await userController.getAll(mockRequest, mockResponse, mockNext);
        expect(mockRepo.getAll).toBeCalledWith();
        expect(mockNext).toHaveBeenCalledWith(new Error('GetAll Error'));
      });
      test('Then, when we call to getById() and we have one error', async () => {
        const mockRequest = {
          params: { id: '01' },
        } as unknown as Request;
        const mockResponse = {
          json: jest.fn(),
        } as unknown as Response;
        const mockNext = jest.fn();
        await userController.getById(mockRequest, mockResponse, mockNext);
        expect(mockRepo.getById).toHaveBeenCalled();
        expect(mockNext).toHaveBeenCalledWith(new Error('GetById Error'));
      });
      test('Then, when we call to create() and we have one error', async () => {
        const mockedData = {
          userName: 'Alex',
          passwd: '1234',
          email: 'alejandro8@gmail.com',
          firstName: 'Alejandro',
          lastName: 'de Oyarbide',
        };
        (mockRepo.create as jest.Mock).mockResolvedValueOnce(Promise<void>);
        const mockRequest = { body: mockedData } as unknown as Request;
        Auth.hash = jest.fn().mockResolvedValue('');
        const mockResponse = {
          json: jest.fn(),
          status: jest.fn(),
        } as unknown as Response;
        const mockNext = jest.fn();

        await userController.create(mockRequest, mockResponse, mockNext);
      });
      test('Then, when we call update(), we should have an error', async () => {
        const mockRequest = {
          params: { id: 'someUserId' },
          body: {
            userName: 'Alex',
          },
        } as unknown as Request;
        const mockResponse = {
          json: jest.fn(),
        } as unknown as Response;
        const mockNext = jest.fn();
        await userController.update(mockRequest, mockResponse, mockNext);
        expect(mockRepo.update).toHaveBeenCalled();
        expect(mockNext).toHaveBeenCalledWith(new Error('Update Error'));
      });
      test('Then, when we call delete(), we should have an error', async () => {
        const mockRequest = {
          params: { id: '1' },
        } as unknown as Request;
        const mockResponse = {
          json: jest.fn(),
        } as unknown as Response;
        const mockNext = jest.fn();
        await userController.delete(mockRequest, mockResponse, mockNext);
        expect(mockRepo.delete).toHaveBeenCalled();
        expect(mockNext).toHaveBeenCalledWith(new Error('Delete Error'));
      });
    });
  });
});
