import { Entity, ObjectIdColumn, Column } from "typeorm";
import { ObjectID } from 'mongodb'

@Entity()
export class Backup {

  constructor(publicKey: string, data: string) {
    this.id = new ObjectID();
    this.publicKey = publicKey;
    this.data = data
  }

  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  publicKey: string;

  @Column()
  data: string;

  static fromData(data: any): Backup {
    if (data.keys && data.keys[0].pubKey) {
      return new Backup(data.keys[0].pubKey, data)
    } else
      throw new Error('Data structure was not valid');
  }
}