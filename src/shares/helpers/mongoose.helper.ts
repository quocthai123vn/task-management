import { ObjectId } from 'mongodb';

export const toObjectId = (id: string) => {
  return new ObjectId(id);
};
