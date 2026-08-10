import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchTasksApi, addTaskApi, deleteTaskApi, toggleTaskApi } from '../api/taskApi';

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  return await fetchTasksApi();
});

export const addTask = createAsyncThunk('tasks/addTask', async (taskData) => {
  return await addTaskApi(taskData);
});

// Optimistic Delete
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
      // Fetch Tasks
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

      // Add Task
      .addCase(addTask.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })

      // Optimistic Delete Handling
      .addCase(deleteTask.pending, (state, action) => {
        // Server cavabı gəlmədən DƏRHAL UI-dan silirik
        const idToDelete = action.meta.arg;
        state.items = state.items.filter((item) => item.id !== idToDelete);
      })
      .addCase(deleteTask.rejected, (state, action) => {
        // Xəta baş verərsə bildiriş veririk (istəyə uyğun olaraq məlumatı yenidən yükləmək olar)
        state.error = 'Silinmə zamanı xəta baş verdi! Səhifəni yeniləyin.';
      });
  },
});

export default taskSlice.reducer;