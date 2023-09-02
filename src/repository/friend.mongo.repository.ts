import createDebug from 'debug';
import { FriendRelationship } from '../model/friendRelation';
import { HttpError } from '../types/http.error';
import { FriendRelationModel } from './friends.mongo.model.js';
import { Repository } from './repository';

const debug = createDebug('V25:RepoFriendsMongoRepository');

export class FriendsMongoRepository implements Repository<FriendRelationship> {
  constructor() {
    debug('Instantiated');
  }

  async getAll(): Promise<FriendRelationship[]> {
    const data = await FriendRelationModel.find().exec();
    return data;
  }

  async getById(id: string): Promise<FriendRelationship> {
    const relationship = await FriendRelationModel.findById(id).exec();

    if (!relationship) {
      throw new HttpError(404, 'Not Found', 'User not found in file system', {
        cause: 'Trying findById',
      });
    }

    return relationship;
  }

  async create(
    newData: Omit<FriendRelationship, 'id'>
  ): Promise<FriendRelationship> {
    const data = await FriendRelationModel.create(newData);

    if (!data) {
      throw new HttpError(
        404,
        'No encontrado',
        'Este usuario no se relaciona con otro usuario con id',
        {
          cause: 'busco una relación de id con id',
        }
      );
    }

    return data;
  }

  async update(
    id: string,
    newData: Partial<FriendRelationship>
  ): Promise<FriendRelationship> {
    const data = await FriendRelationModel.findById(id, newData, {
      new: true,
    }).exec();
    if (!data)
      throw new HttpError(
        404,
        'No lo encuentro!',
        'No encuentro el id en el sistema',
        {
          cause: 'Busco su id',
        }
      );
    return data;
  }

  async delete(id: string): Promise<void> {
    const result = await FriendRelationModel.findByIdAndDelete(id).exec();
    if (!result)
      throw new HttpError(
        404,
        'No lo encuentro!',
        'No encuentro el id en el sistema',
        {
          cause: 'Busco su id',
        }
      );
  }
}
