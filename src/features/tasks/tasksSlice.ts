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

// Load tasks from local storage
const loadTasksFromLocalStorage = (): Task[] => {
  const savedTasks = localStorage.getItem('tasks');
  return savedTasks ? JSON.parse(savedTasks) : [];
};

//   initial state
const initialState: TasksState = {
  tasks: loadTasksFromLocalStorage(),
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    // Add task
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
      localStorage.setItem('tasks', JSON.stringify(state.tasks)); // Save to local storage
    },
    // Edit task
    editTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex(task => task.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
        localStorage.setItem('tasks', JSON.stringify(state.tasks)); // Update local storage
      }
    },
    // Delete task
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
      localStorage.setItem('tasks', JSON.stringify(state.tasks)); // Update local storage
    }
  }
});

// Export  
export const { addTask, editTask, deleteTask } = tasksSlice.actions;
 
export default tasksSlice.reducer;
