import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Login } from '../pages/Login';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import api from '../services/api';
import React from 'react';
import testLogger from '../test/testLogger';

// Mock the api module
vi.mock('../services/api', () => ({
  default: {
    post: vi.fn(),
  },
}));

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('Login Component', () => {
  const renderLogin = () => {
    try {
      return render(
        <BrowserRouter>
          <AuthProvider>
            <Login />
          </AuthProvider>
        </BrowserRouter>
      );
    } catch (error) {
      testLogger.error('Error rendering Login component:', error);
      throw error;
    }
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders login form', () => {
    try {
      renderLogin();
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: /login/i })
      ).toBeInTheDocument();
    } catch (error) {
      testLogger.error('Error in login form render test:', error);
      throw error;
    }
  });

  it('handles input changes', () => {
    try {
      renderLogin();
      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);

      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });

      expect(emailInput).toHaveValue('test@example.com');
      expect(passwordInput).toHaveValue('password123');
    } catch (error) {
      testLogger.error('Error in input changes test:', error);
      throw error;
    }
  });

  it('handles successful login', async () => {
    try {
      renderLogin();
      const mockResponse = {
        data: {
          token: 'fake-token',
          user: { id: 1, email: 'test@example.com' },
        },
      };
      (api.post as any).mockResolvedValueOnce(mockResponse);

      fireEvent.change(screen.getByLabelText(/email/i), {
        target: { value: 'test@example.com' },
      });
      fireEvent.change(screen.getByLabelText(/password/i), {
        target: { value: 'password123' },
      });
      fireEvent.click(screen.getByRole('button', { name: /login/i }));

      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
      });
    } catch (error) {
      testLogger.error('Error in successful login test:', error);
      throw error;
    }
  });

  it('handles login failure', async () => {
    renderLogin();

    // Mock API error
    const errorMessage = 'Invalid credentials';
    (api.post as any).mockRejectedValueOnce({
      response: { data: { message: errorMessage } },
    });

    // Fill and submit form
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'wrongpassword' },
    });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    // Check if error message is displayed
    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });

  it('requires email and password fields', () => {
    renderLogin();

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    expect(emailInput).toBeRequired();
    expect(passwordInput).toBeRequired();
  });

  it('applies correct CSS classes to form elements', () => {
    renderLogin();

    const loginButton = screen.getByRole('button', { name: /login/i });
    expect(loginButton).toHaveClass(
      'w-full',
      'bg-blue-500',
      'text-white',
      'py-2',
      'px-4',
      'rounded',
      'hover:bg-blue-600'
    );

    const emailInput = screen.getByLabelText(/email/i);
    expect(emailInput).toHaveClass(
      'w-full',
      'px-3',
      'py-2',
      'border',
      'border-gray-300',
      'rounded'
    );
  });
});
