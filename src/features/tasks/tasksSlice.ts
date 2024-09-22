import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the task structure
interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  status: 'in-progress' | 'completed';
}

// Define the initial state
interface TasksState {
  tasks: Task[];
}

const initialState: TasksState = {
  tasks: []
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    // Add task
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
    // Edit task
    editTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex(task => task.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
    // Delete task
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    }
  }
});

// Export actions
export const { addTask, editTask, deleteTask } = tasksSlice.actions;

// Export the reducer
export default tasksSlice.reducer;
