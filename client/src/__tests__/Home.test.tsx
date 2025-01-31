import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Home } from '../pages/Home';
import React from 'react';
import testLogger from '../test/testLogger';

describe('Home Component', () => {
  it('renders welcome message', () => {
    try {
      render(<Home />);
      expect(screen.getByText('Welcome to Task Manager')).toBeInTheDocument();
      expect(
        screen.getByText('Manage your tasks efficiently')
      ).toBeInTheDocument();
    } catch (error) {
      testLogger.error('Error in Home welcome message test:', error);
      throw error;
    }
  });

  it('applies correct CSS classes', () => {
    try {
      render(<Home />);
      const heading = screen.getByText('Welcome to Task Manager');
      const paragraph = screen.getByText('Manage your tasks efficiently');

      expect(heading).toHaveClass('text-4xl', 'font-bold', 'text-gray-900');
      expect(paragraph).toHaveClass('text-xl', 'text-gray-600');
    } catch (error) {
      testLogger.error('Error in Home CSS classes test:', error);
      throw error;
    }
  });
});
