import { Schema, model } from 'mongoose';
import { EnemyRelationship } from '../model/enemyRelation.js';

const enemySchema = new Schema<EnemyRelationship>({
  idUser1: { type: String, required: true },
  idUser2: { type: String, required: true },
});

enemySchema.set('toJSON', {
  transform(_document, returnedObject) {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwd;
  },
});

export const EnemyRelationModel = model('Enemy', enemySchema, 'Enemy');
