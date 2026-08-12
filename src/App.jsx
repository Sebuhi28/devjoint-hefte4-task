import './assets/styles/global.css';
import { BrowserRouter } from 'react-router-dom';
import { StoreProvider } from './app/providers/StoreProvider';
import { AppRoutes } from './app/routes/AppRoutes';
import { ToastProvider } from './components/feedback/ToastProvider';

function App() {
  return (
    <StoreProvider>
      <ToastProvider>
        <BrowserRouter>
          <div className="app-shell">
            <AppRoutes />
          </div>
        </BrowserRouter>
      </ToastProvider>
    </StoreProvider>
  );
}

export default App;