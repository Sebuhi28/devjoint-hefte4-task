import './assets/styles/global.css';
import { HashRouter } from 'react-router-dom';
import { StoreProvider } from './app/providers/StoreProvider';
import { AppRoutes } from './app/routes/AppRoutes';
import { ToastProvider } from './components/feedback/ToastProvider';

function App() {
  return (
    <StoreProvider>
      <ToastProvider>
        <HashRouter>
          <div className="app-shell">
            <AppRoutes />
          </div>
        </HashRouter>
      </ToastProvider>
    </StoreProvider>
  );
}

export default App;