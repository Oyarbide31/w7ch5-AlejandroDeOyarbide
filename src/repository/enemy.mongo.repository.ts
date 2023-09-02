import createDebug from 'debug';
import { EnemyRelationship } from '../model/enemyRelation.js';
import { HttpError } from '../types/http.error.js';
import { EnemyRelationModel } from './enemy.mongo.model.js';
import { Repository } from './repository.js';

const debug = createDebug('V25:RepoFriendsMongoRepository');

export class EnemyMongoRepository implements Repository<EnemyRelationship> {
  constructor() {
    debug('Instantiated');
  }

  async getAll(): Promise<EnemyRelationship[]> {
    const data = await EnemyRelationModel.find().exec();
    return data;
  }

  async getById(id: string): Promise<EnemyRelationship> {
    const relationship = await EnemyRelationModel.findById(id).exec();

    if (!relationship) {
      throw new HttpError(404, 'Not Found', 'User not found in file system', {
        cause: 'Trying findById',
      });
    }

    return relationship;
  }

  async create(
    newData: Omit<EnemyRelationship, 'id'>
  ): Promise<EnemyRelationship> {
    const data = await EnemyRelationModel.create(newData);

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
    newData: Partial<EnemyRelationship>
  ): Promise<EnemyRelationship> {
    const data = await EnemyRelationModel.findById(id, newData, {
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
    const result = await EnemyRelationModel.findByIdAndDelete(id).exec();
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
