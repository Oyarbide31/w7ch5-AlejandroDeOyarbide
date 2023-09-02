import { Schema, model } from 'mongoose';
import { FriendRelationship } from '../model/friendRelation';

const friendsSchema = new Schema<FriendRelationship>({
  idUser1: { type: String, required: true },
  idUser2: { type: String, required: true },
});

friendsSchema.set('toJSON', {
  transform(_document, returnedObject) {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwd;
  },
});

export const FriendRelationModel = model('Friend', friendsSchema, 'friends');
