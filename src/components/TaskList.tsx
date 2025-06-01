import { ITask } from '@/models/Task';
import Link from 'next/link';

interface TaskListProps {
  tasks: ITask[];
  onDelete: (id: string) => void;
  onToggleComplete: (id: string, completed: boolean) => void;
}

export default function TaskList({ tasks, onDelete, onToggleComplete }: TaskListProps) {
  return (
    <div className="space-y-4">
      {tasks.map((task) => {
        const taskId = task._id?.toString(); // safe optional chaining

        return (
          <div
            key={taskId ?? Math.random().toString()} // fallback key if ID is missing
            className={`p-4 border rounded-lg ${task.completed ? 'bg-gray-50' : 'bg-white'}`}
          >
            <div className="flex justify-between items-start">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => {
                    if (taskId) onToggleComplete(taskId, !task.completed);
                  }}
                  className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <p className={`${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                  {task.description}
                </p>
              </div>
              <div className="flex space-x-2">
                {taskId && (
                  <Link
                    href={`/tasks/${taskId}/edit`}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    Edit
                  </Link>
                )}
                <button
                  onClick={() => {
                    if (taskId) onDelete(taskId);
                  }}
                  className="text-red-600 hover:text-red-900"
                >
                  Delete
                </button>
              </div>
            </div>
            <div className="mt-2 text-xs text-gray-500">
              Created: {new Date(task.createdAt).toLocaleString()}
            </div>
          </div>
        );
      })}
    </div>
  );
}
