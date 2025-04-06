import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import TodoDetailsPage from './pages/TodoDetailsPage';
import CompletedTodosPage from './pages/CompletedTodosPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {

  return (
    <Provider store={store}>
      <ThemeProvider>
        <Router>
          <div className="app">
            <Navbar title="NotList App"></Navbar> 
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/todo/:id" element={<TodoDetailsPage />} />
              <Route path="/completed" element={<CompletedTodosPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;