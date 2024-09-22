import React, { useState } from 'react';
import TaskForm from './TaskForm';
import TaskList from './TaskList';

const TaskManager: React.FC = () => {
  const [editingTask, setEditingTask] = useState<any>(null);

  const handleEdit = (task: any) => {
    setEditingTask(task);
  };

  const handleCloseForm = () => {
    setEditingTask(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Task Manager</h1>
      <TaskForm task={editingTask} onClose={handleCloseForm} />
      <TaskList onEdit={handleEdit} />
    </div>
  );
};

export default TaskManager;
