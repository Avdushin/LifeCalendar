import { BrowserRouter as Router } from 'react-router-dom';
import { AppRoutes } from '@/routes';
import { ToastContainer } from 'react-toastify';
import { ThemeContextProvider } from './context/ThemeContext';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <ThemeContextProvider>
      <Router>
        <ToastContainer />
        <AppRoutes />
      </Router>
    </ThemeContextProvider>
  );
}

export default App;
