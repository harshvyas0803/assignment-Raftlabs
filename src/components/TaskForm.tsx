import React, { useState, useEffect } from 'react';
import { Button, Form, Input, DatePicker, Select } from 'antd';
import { useDispatch } from 'react-redux';
import { addTask, editTask } from '../features/tasks/tasksSlice';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';

// Define the props for TaskForm
interface TaskFormProps {
  task?: any; // Optional task for editing
  onClose?: () => void; // Function to close form modal
}

const { Option } = Select;

const TaskForm: React.FC<TaskFormProps> = ({ task, onClose }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  // Pre-fill form if editing
  useEffect(() => {
    if (task) {
      form.setFieldsValue({
        ...task,
        dueDate: dayjs(task.dueDate),
      });
    }
  }, [task, form]);

  // Handle form submit
  const onFinish = (values: any) => {
    const taskData = {
      ...values,
      id: task?.id || uuidv4(), // Generate new ID if creating
      dueDate: values.dueDate.format('YYYY-MM-DD'),
    };

    if (task) {
      dispatch(editTask(taskData));
    } else {
      dispatch(addTask(taskData));
    }

    // Close the form if a close function is passed
    if (onClose) onClose();
    form.resetFields();
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish} className="p-4 bg-white rounded shadow-md">

      <Form.Item name="title" label="Title" rules={[{ required: true, message: 'Please enter a title' }]}>
        <Input />
      </Form.Item>
      <Form.Item name="description" label="Description">
        <Input.TextArea rows={4} />
      </Form.Item>
      <Form.Item name="dueDate" label="Due Date" rules={[{ required: true, message: 'Please select a due date' }]}>
        <DatePicker />
      </Form.Item>
      <Form.Item name="priority" label="Priority" rules={[{ required: true }]}>
        <Select>
          <Option value="low">Low</Option>
          <Option value="medium">Medium</Option>
          <Option value="high">High</Option>
        </Select>
      </Form.Item>
      <Form.Item name="status" label="Status" rules={[{ required: true }]}>
        <Select>
          <Option value="in-progress">In Progress</Option>
          <Option value="completed">Completed</Option>
        </Select>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          {task ? 'Update Task' : 'Add Task'}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TaskForm;
