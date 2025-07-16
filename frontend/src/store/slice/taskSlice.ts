import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { TaskState, Task, TaskFormData } from '../../types';
import { apiService } from '../../services/api';

const initialState: TaskState = {
  tasks: [],
  isLoading: false,
  error: null,
};

// Async thunks
export const fetchProjectTasks = createAsyncThunk(
  'tasks/fetchProjectTasks',
  async (projectId: string, { rejectWithValue }) => {
    try {
      const response = await apiService.getProjectTasks(projectId);
      if (response.success) {
        return response.data;
      }
      return rejectWithValue(response.message || 'Failed to fetch tasks');
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch tasks');
    }
  }
);

export const createTask = createAsyncThunk(
  'tasks/createTask',
  async ({ projectId, taskData }: { projectId: string; taskData: TaskFormData }, { rejectWithValue }) => {
    try {
      const response = await apiService.createTask(projectId, taskData);
      if (response.success) {
        return response.data;
      }
      return rejectWithValue(response.message || 'Failed to create task');
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create task');
    }
  }
);

export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async ({ id, taskData }: { id: string; taskData: TaskFormData }, { rejectWithValue }) => {
    try {
      const response = await apiService.updateTask(id, taskData);
      if (response.success) {
        return response.data;
      }
      return rejectWithValue(response.message || 'Failed to update task');
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update task');
    }
  }
);

export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await apiService.deleteTask(id);
      if (response.success) {
        return id;
      }
      return rejectWithValue(response.message || 'Failed to delete task');
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete task');
    }
  }
);

export const fetchTasksByStatus = createAsyncThunk(
  'tasks/fetchTasksByStatus',
  async (status: string, { rejectWithValue }) => {
    try {
      const response = await apiService.getTasksByStatus(status);
      if (response.success) {
        return response.data;
      }
      return rejectWithValue(response.message || 'Failed to fetch tasks');
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch tasks');
    }
  }
);

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearTasks: (state) => {
      state.tasks = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch project tasks
      .addCase(fetchProjectTasks.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProjectTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchProjectTasks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Create task
      .addCase(createTask.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasks.push(action.payload);
      })
      .addCase(createTask.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Update task
      .addCase(updateTask.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.tasks.findIndex(t => t._id === action.payload._id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Delete task
      .addCase(deleteTask.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasks = state.tasks.filter(t => t._id !== action.payload);
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Fetch tasks by status
      .addCase(fetchTasksByStatus.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTasksByStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasksByStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, clearTasks } = taskSlice.actions;
export default taskSlice.reducer;