import { getStoredUser } from '../../../utils/localStorage';

const getStorageKey = () => {
  const user = getStoredUser();
  const userId = user?.id || 'guest';
  return `mock_tasks_${userId}`;
};

const seedTasks = [
  { id: '1', title: 'React Router setup etmək', completed: false, priority: 'medium', dueDate: null },
];

const delay = (ms = 200) => new Promise((resolve) => setTimeout(resolve, ms));

const loadTasks = () => {
  const key = getStorageKey();
  const data = localStorage.getItem(key);
  if (data) return JSON.parse(data);
  localStorage.setItem(key, JSON.stringify(seedTasks));
  return seedTasks;
};

const saveTasks = (tasks) => {
  localStorage.setItem(getStorageKey(), JSON.stringify(tasks));
};

export const fetchTasksApi = async () => {
  await delay();
  return loadTasks();
};

export const addTaskApi = async (newTask) => {
  await delay();
  const tasks = loadTasks();
  const created = { ...newTask, id: Date.now().toString() };
  const updated = [...tasks, created];
  saveTasks(updated);
  return created;
};

export const deleteTaskApi = async (id) => {
  await delay();
  const tasks = loadTasks();
  saveTasks(tasks.filter((task) => task.id !== id));
  return id;
};

export const toggleTaskApi = async (task) => {
  await delay();
  const tasks = loadTasks();
  const updated = tasks.map((item) =>
    item.id === task.id ? { ...item, completed: !item.completed } : item
  );
  saveTasks(updated);
  return updated.find((item) => item.id === task.id);
};

export const updateTaskApi = async (id, changes) => {
  await delay();
  const tasks = loadTasks();
  const updated = tasks.map((item) => (item.id === id ? { ...item, ...changes } : item));
  saveTasks(updated);
  return updated.find((item) => item.id === id);
};
