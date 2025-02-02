import React, { useState, useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Navigate,
  useNavigate,
} from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { WebSocketProvider } from './context/WebSocketContext';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import { Automation } from './pages/Automation';
import { WebForm } from './components/automation/WebForm';
import { Buttons } from './components/automation/Buttons';
import { Dropdown } from './components/automation/Dropdown';
import { MouseOver } from './components/automation/MouseOver';
import { DragAndDrop } from './components/automation/DragAndDrop';

// Protected Route component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

// Navigation component
const Navigation: React.FC<{
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ darkMode, setDarkMode }) => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="bg-white dark:bg-dark-card shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <ul className="flex space-x-4 items-center">
            <li>
              <Link
                to="/"
                className="text-gray-700 dark:text-dark-text hover:text-gray-900"
              >
                Home
              </Link>
            </li>
            {!isAuthenticated ? (
              <>
                <li>
                  <Link
                    to="/login"
                    className="text-gray-700 dark:text-dark-text hover:text-gray-900"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    className="text-gray-700 dark:text-dark-text hover:text-gray-900"
                  >
                    Register
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/dashboard"
                    className="text-gray-700 dark:text-dark-text hover:text-gray-900"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <button
                    onClick={logout}
                    className="text-gray-700 dark:text-dark-text hover:text-gray-900"
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
          <div className="flex items-center space-x-4">
            {isAuthenticated && (
              <Link
                to="/automation"
                className="text-gray-700 dark:text-dark-text hover:text-gray-900"
                data-testid="automation-link"
              >
                Test Automation
              </Link>
            )}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="text-gray-700 dark:text-dark-text hover:text-gray-900"
            >
              {darkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);

  return (
    <AuthProvider>
      <WebSocketProvider>
        <BrowserRouter>
          <div className="min-h-screen dark:bg-dark-background bg-gray-100">
            <Navigation darkMode={darkMode} setDarkMode={setDarkMode} />
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/automation/*"
                  element={
                    <ProtectedRoute>
                      <Automation />
                    </ProtectedRoute>
                  }
                />
                <Route path="/automation" element={<Automation />} />
                <Route
                  path="/automation/form"
                  element={
                    <ProtectedRoute>
                      <WebForm />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/automation/buttons"
                  element={
                    <ProtectedRoute>
                      <Buttons />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/automation/dropdown"
                  element={
                    <ProtectedRoute>
                      <Dropdown />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/automation/mouse-over"
                  element={
                    <ProtectedRoute>
                      <MouseOver />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/automation/drag-and-drop"
                  element={
                    <ProtectedRoute>
                      <DragAndDrop />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </main>
          </div>
        </BrowserRouter>
      </WebSocketProvider>
    </AuthProvider>
  );
};
