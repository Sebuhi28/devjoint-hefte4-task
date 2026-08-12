import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { addTask } from '../slice/taskSlice';
import { useToast } from '../../../components/feedback/ToastProvider';

export const TaskForm = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: { priority: 'medium', dueDate: '' },
  });
  const dispatch = useDispatch();
  const { addToast } = useToast();

  const onSubmit = async (data) => {
    try {
      await dispatch(addTask({
        title: data.title,
        completed: false,
        priority: data.priority,
        dueDate: data.dueDate || null,
      })).unwrap();
      reset({ title: '', priority: 'medium', dueDate: '' });
      addToast('Tapşırıq əlavə olundu', 'success');
    } catch {
      addToast('Tapşırıq əlavə olunmadı', 'error');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="task-form">
      <div className="task-form-field task-form-title">
        <input
          type="text"
          className="form-input"
          placeholder="Yeni tapşırıq yazın..."
          {...register('title', { required: 'Başlıq boş ola bilməz' })}
          aria-invalid={errors.title ? 'true' : 'false'}
        />
        {errors.title && <span className="form-error">{errors.title.message}</span>}
      </div>

      <div className="task-form-field">
        <select className="form-input" {...register('priority')}>
          <option value="low">Aşağı prioritet</option>
          <option value="medium">Orta prioritet</option>
          <option value="high">Yüksək prioritet</option>
        </select>
      </div>

      <div className="task-form-field">
        <input type="date" className="form-input" {...register('dueDate')} />
      </div>

      <button type="submit" className="primary-button task-button">Əlavə et</button>
    </form>
  );
};