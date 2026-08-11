import './assets/styles/global.css';
import { BrowserRouter } from 'react-router-dom';
import { StoreProvider } from './app/providers/StoreProvider';
import { AppRoutes } from './app/routes/AppRoutes';

function App() {
  return (
    <StoreProvider>
      <BrowserRouter>
        <div className="app-shell">
          <AppRoutes />
        </div>
      </BrowserRouter>
    </StoreProvider>
  );
}

export default App;