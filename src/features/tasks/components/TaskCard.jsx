import { useDispatch } from 'react-redux';
import { deleteTask } from '../slice/taskSlice';

export const TaskCard = ({ task }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    // Optimistic delete: Düyməyə basılan an UI dərhal yenilənəcək
    dispatch(deleteTask(task.id));
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px',
      border: '1px solid #ccc',
      marginBottom: '8px',
      borderRadius: '4px'
    }}>
      <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
        {task.title}
      </span>
      <button onClick={handleDelete} style={{ background: 'red', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}>
        Sil
      </button>
    </div>
  );
};