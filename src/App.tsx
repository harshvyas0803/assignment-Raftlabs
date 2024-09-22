import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

const App: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingTask, setEditingTask] = useState<any>(null); // State for the task being edited

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setEditingTask(null); // Clear editing task when closing
  };

  const handleEdit = (task: any) => {
    setEditingTask(task); // Set the task to be edited
    setIsModalVisible(true); // Open the modal for editing
  };

  return (
    <div>
      <Button type="primary" className='m-2' onClick={handleOpenModal}>
        Add Task
      </Button>

      {/* Modal for adding or editing task */}
      <Modal title={editingTask ? "Edit Task" : "Add Task"} visible={isModalVisible} onCancel={handleCloseModal} footer={null}>
        <TaskForm task={editingTask} onClose={handleCloseModal} />
      </Modal>

      <TaskList onEdit={handleEdit} />
    </div>
  );
};

export default App;
