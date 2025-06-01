import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { getTaskCollection } from '@/models/Task';

// GET a single task
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const collection = await getTaskCollection();
    const task = await collection.findOne({ _id: new ObjectId(params.id) });

    if (!task) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }

    return NextResponse.json(task);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch task' },
      { status: 500 }
    );
  }
}

// PUT update a task
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const { description, completed } = await request.json();
    const collection = await getTaskCollection();

    const updateData: any = { updatedAt: new Date() };
    if (description !== undefined) updateData.description = description;
    if (completed !== undefined) updateData.completed = completed;

    const result = await collection.updateOne(
      { _id: new ObjectId(params.id) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }

    const updatedTask = await collection.findOne({ _id: new ObjectId(params.id) });
    return NextResponse.json(updatedTask);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update task' },
      { status: 500 }
    );
  }
}

// DELETE a task
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const collection = await getTaskCollection();
    const result = await collection.deleteOne({ _id: new ObjectId(params.id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Task deleted successfully' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete task' },
      { status: 500 }
    );
  }
}