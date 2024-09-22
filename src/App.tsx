import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

const App: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <Button type="primary" onClick={handleOpenModal}>
        Add Task
      </Button>

      {/* Modal for adding task */}
      <Modal title="Add Task" visible={isModalVisible} onCancel={handleCloseModal} footer={null}>
        <TaskForm onClose={handleCloseModal} />
      </Modal>

      <TaskList />
    </div>
  );
};

export default App;
