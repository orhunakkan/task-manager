import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Home } from '../pages/Home';
import React from 'react';

describe('Home', () => {
  it('renders welcome message', () => {
    render(<Home />);

    expect(screen.getByText('Welcome to Task Manager')).toBeInTheDocument();
    expect(
      screen.getByText('Manage your tasks efficiently')
    ).toBeInTheDocument();
  });
});
