import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchTasksApi, addTaskApi, deleteTaskApi, toggleTaskApi, updateTaskApi } from '../api/taskApi';

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  return await fetchTasksApi();
});

export const addTask = createAsyncThunk('tasks/addTask', async (taskData) => {
  return await addTaskApi(taskData);
});

export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async (id, { rejectWithValue }) => {
    try {
      await deleteTaskApi(id);
      return id;
    } catch (error) {
      return rejectWithValue({ id, message: error.message });
    }
  }
);

export const toggleTask = createAsyncThunk(
  'tasks/toggleTask',
  async (task, { rejectWithValue }) => {
    try {
      return await toggleTaskApi(task);
    } catch (error) {
      return rejectWithValue({ task, message: error.message });
    }
  }
);

export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async ({ id, changes }, { rejectWithValue }) => {
    try {
      return await updateTaskApi(id, changes);
    } catch (error) {
      return rejectWithValue({ id, message: error.message });
    }
  }
);

const taskSlice = createSlice({
  name: 'tasks',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(addTask.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })

      .addCase(deleteTask.pending, (state, action) => {
        const idToDelete = action.meta.arg;
        state.items = state.items.filter((item) => item.id !== idToDelete);
      })
      .addCase(deleteTask.rejected, (state) => {
        state.error = 'Silinmə zamanı xəta baş verdi! Səhifəni yeniləyin.';
      })

      .addCase(toggleTask.pending, (state, action) => {
        const task = action.meta.arg;
        state.items = state.items.map((item) =>
          item.id === task.id ? { ...item, completed: !item.completed } : item
        );
      })
      .addCase(toggleTask.fulfilled, (state, action) => {
        const updatedTask = action.payload;
        state.items = state.items.map((item) =>
          item.id === updatedTask.id ? updatedTask : item
        );
      })
      .addCase(toggleTask.rejected, (state, action) => {
        const task = action.payload?.task;
        if (task) {
          state.items = state.items.map((item) =>
            item.id === task.id ? { ...item, completed: task.completed } : item
          );
        }
        state.error = action.payload?.message || 'Tapşırıq yeniləmək olmur.';
      })

      .addCase(updateTask.fulfilled, (state, action) => {
        const updated = action.payload;
        state.items = state.items.map((item) => (item.id === updated.id ? updated : item));
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.error = action.payload?.message || 'Tapşırıq yenilənmədi.';
      });
  },
});

export default taskSlice.reducer;