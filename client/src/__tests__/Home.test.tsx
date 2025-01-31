import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Home } from '../pages/Home';
import React from 'react';

describe('Home Component', () => {
  it('renders welcome message', () => {
    render(<Home />);

    // Check if the main heading is rendered
    expect(screen.getByText('Welcome to Task Manager')).toBeInTheDocument();

    // Check if the subheading is rendered
    expect(
      screen.getByText('Manage your tasks efficiently')
    ).toBeInTheDocument();
  });

  it('applies correct CSS classes', () => {
    render(<Home />);

    // Check if the heading has the correct classes
    const heading = screen.getByText('Welcome to Task Manager');
    expect(heading).toHaveClass('text-4xl', 'font-bold', 'text-gray-900');

    // Check if the paragraph has the correct classes
    const paragraph = screen.getByText('Manage your tasks efficiently');
    expect(paragraph).toHaveClass('text-xl', 'text-gray-600');
  });
});
