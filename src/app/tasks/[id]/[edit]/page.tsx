'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import TaskForm from '@/components/TaskForm';

export default function EditTask({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [task, setTask] = useState<{ description: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await fetch(`/api/tasks/${params.id}`);
        const data = await response.json();
        setTask(data);
      } catch (error) {
        console.error('Error fetching task:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTask();
  }, [params.id]);

  const handleUpdateTask = async (description: string) => {
    try {
      await fetch(`/api/tasks/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description }),
      });
      router.push('/');
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  if (isLoading) {
    return <div className="p-4">Loading...</div>;
  }

  if (!task) {
    return <div className="p-4">Task not found</div>;
  }

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <h1 className="text-2xl font-bold mb-6">Edit Task</h1>
      <TaskForm
        initialDescription={task.description}
        onSubmit={handleUpdateTask}
        buttonText="Update Task"
      />
    </div>
  );
}