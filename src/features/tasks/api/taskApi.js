import { api } from '../../../services/apiConfig';

export const fetchTasksApi = async () => {
  const response = await api.get('/tasks');
  return response.data;
};

export const addTaskApi = async (newTask) => {
  const response = await api.post('/tasks', newTask);
  return response.data;
};

export const deleteTaskApi = async (id) => {
  await api.delete(`/tasks/${id}`);
  return id;
};

export const toggleTaskApi = async (task) => {
  const response = await api.patch(`/tasks/${task.id}`, { completed: !task.completed });
  return response.data;
};