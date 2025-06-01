import { FormEvent } from 'react';

interface TaskFormProps {
  initialDescription?: string;
  onSubmit: (description: string) => void;
  isSubmitting?: boolean;
  buttonText?: string;
}

export default function TaskForm({
  initialDescription = '',
  onSubmit,
  isSubmitting = false,
  buttonText = 'Add Task',
}: TaskFormProps) {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const description = formData.get('description') as string;
    onSubmit(description);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Task Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={3}
          defaultValue={initialDescription}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        />
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Processing...' : buttonText}
      </button>
    </form>
  );
}