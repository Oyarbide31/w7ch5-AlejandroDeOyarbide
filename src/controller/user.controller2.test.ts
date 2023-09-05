import { Request, Response } from 'express';
import { UserMongoRepository } from '../repository/user.mongo.repository';
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
      // Aconst mockedUser= {
      // }
    });

    /*
    Test('Then we use search() method', async()=>{
      const mockData = [{key: '1', value:'Pedro'}];
      (mockRepo.search as jest.Mock).mockResolvedValueOnce(mockData);
      const mockKey = { key: '1' } as unknown as key;
      const mockValue= {value: 'Pedro'} as unknown as value;

      await userController.search()
    }) */
  });
});
