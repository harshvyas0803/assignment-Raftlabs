import React, { useState } from 'react';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import { motion } from 'framer-motion';

const TaskManager: React.FC = () => {
  const [editingTask, setEditingTask] = useState<any>(null);

  const handleEdit = (task: any) => {
    setEditingTask(task);
  };

  const handleCloseForm = () => {
    setEditingTask(null);
  };

  return (
    <motion.div
      className="max-w-4xl mx-auto p-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-2xl font-bold mb-4">Task Manager</h1>
      <TaskForm task={editingTask} onClose={handleCloseForm} />
      <TaskList onEdit={handleEdit} />
    </motion.div>
  );
};

export default TaskManager;
