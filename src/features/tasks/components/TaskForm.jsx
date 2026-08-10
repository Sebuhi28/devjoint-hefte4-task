import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { addTask } from '../slice/taskSlice';

export const TaskForm = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(addTask({ title: data.title, completed: false }));
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
      <div style={{ flexGrow: 1 }}>
        <input
          type="text"
          placeholder="Yeni tapşırıq yazın..."
          {...register('title', { required: 'Başlıq boş ola bilməz' })}
          style={{ width: '100%', padding: '8px' }}
        />
        {errors.title && <span style={{ color: 'red', fontSize: '12px' }}>{errors.title.message}</span>}
      </div>
      <button type="submit" style={{ padding: '8px 16px', height: '36px' }}>Əlavə et</button>
    </form>
  );
};