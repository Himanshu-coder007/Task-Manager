import { NextResponse } from 'next/server';
import { getTaskCollection } from '@/models/Task';

// GET all tasks
export async function GET() {
  try {
    const collection = await getTaskCollection();
    const tasks = await collection.find().sort({ createdAt: -1 }).toArray();
    return NextResponse.json(tasks);
  } catch (err) {
    console.error('Failed to fetch tasks:', err);
    return NextResponse.json(
      { error: 'Failed to fetch tasks' },
      { status: 500 }
    );
  }
}

// POST a new task
export async function POST(request: Request) {
  try {
    const { description } = await request.json();
    
    if (!description) {
      return NextResponse.json(
        { error: 'Description is required' },
        { status: 400 }
      );
    }

    const collection = await getTaskCollection();
    const newTask = {
      description,
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await collection.insertOne(newTask);
    return NextResponse.json({ ...newTask, _id: result.insertedId });
  } catch (err) {
    console.error('Failed to create task:', err);
    return NextResponse.json(
      { error: 'Failed to create task' },
      { status: 500 }
    );
  }
}