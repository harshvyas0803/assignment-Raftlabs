import React, { useState } from 'react';
import { Button, Table, Tag, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { deleteTask } from '../features/tasks/tasksSlice';
import { motion } from 'framer-motion';

interface TaskListProps {
  onEdit: (task: any) => void; // Accept an onEdit prop
}

const TaskList: React.FC<TaskListProps> = ({ onEdit }) => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const [searchTerm, setSearchTerm] = useState('');

  // Handle task deletion
  const handleDelete = (id: string) => {
    dispatch(deleteTask(id));
  };

  // Filter tasks based on search term
  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Define columns for the Ant Design Table
  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Due Date',
      dataIndex: 'dueDate',
      key: 'dueDate',
      sorter: (a: any, b: any) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime(),
    },
    {
      title: 'Priority',
      dataIndex: 'priority',
      key: 'priority',
      render: (priority: string) => {
        let color = priority === 'high' ? 'red' : priority === 'medium' ? 'orange' : 'green';
        return <Tag color={color}>{priority.toUpperCase()}</Tag>;
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        let color = status === 'completed' ? 'green' : 'blue';
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: any) => (
        <>
          <Button onClick={() => onEdit(record)}>Edit</Button>
          <Button danger onClick={() => handleDelete(record.id)}>
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <Input
        placeholder="Search tasks..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4"
      />
      <Table
        dataSource={filteredTasks.map(task => ({
          ...task,
          key: task.id,
        }))}
        columns={columns}
        rowKey="id"
        components={{
          body: {
            row: ({ children, ...rest }: { children: React.ReactNode; [key: string]: any }) => (
              <motion.tr
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                whileHover={{ scale: 1.02 }} // Scale on hover
                {...rest}
              >
                {children}
              </motion.tr>
            ),
          },
        }}
      />
    </div>
  );
};

export default TaskList;
