import { Collection, Document, ObjectId } from 'mongodb';
import clientPromise from '@/lib/db';

export interface ITask extends Document {
  _id?: ObjectId;
  description: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export const getTaskCollection = async (): Promise<Collection<ITask>> => {
  const client = await clientPromise;
  console.log('✅ Connected to MongoDB'); // Connection message
  const db = client.db();
  return db.collection<ITask>('tasks');
};
