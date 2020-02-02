import { IWrite } from '../interfaces/IWrite';
import { IRead } from '../interfaces/IRead';

import {  Db, Collection, InsertOneWriteOpResult, ObjectID } from 'mongodb';
import { injectable, unmanaged } from 'inversify';
import { DBEntityModel } from '../../models/DBEntityModel';

export type DBProvider = () => Promise<Db>;

@injectable()
export abstract class BaseRepository<T extends DBEntityModel> implements IWrite<T>, IRead<T> {
  public _collection: Collection;
  protected _collectionName: string;

  public constructor(@unmanaged() connection: Db, @unmanaged() collectionName: string) {
    this._collection = connection.collection(collectionName);
    this._collectionName = collectionName;
  }
 
  async create(item: T): Promise<T> {
    const result: InsertOneWriteOpResult = await this._collection.insert(item);
    if (!!result.result.ok) {
      return result.ops[0];
    }
    return Promise.reject('Error creating the item');
  }

  async update(id: string, item: T): Promise<T> {
    const objectId = new ObjectID(id);
    try {
      var updatedValues = { $set: item };
      const result: any = await this._collection.updateOne({_id: objectId}, updatedValues);
      if (!!result.result.ok) {
        return Promise.resolve(item);
      } else  {
        return Promise.reject('Error updating the item');
      }
    } catch (e) {
      console.log('Error ...', e);
      return Promise.reject(e);
    }
  }

  async delete(id: string): Promise<boolean> {
    const objectId = new ObjectID(id);
    const result: any = await this._collection.deleteOne({_id: objectId});
    if (!!result.result.ok) {
      return Promise.resolve(true);
    } else  {
      return Promise.reject('Error updating the item');
    }
  }
  
  async find(item: any): Promise<T[]> {
    return this._collection.find(item).toArray();
  }
  
  async findOne(id: string): Promise<T> {
    const objectId = new ObjectID(id);
    return this._collection.findOne({_id: objectId})
  }
  
  async findOnebyQuery(query: any): Promise<T> {
    return this._collection.findOne(query);
  }
}
