import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface AutomationSection {
  title: string;
  path: string;
  description: string;
}

const automationSections: AutomationSection[] = [
  {
    title: 'Complete Web Form',
    path: '/automation/form',
    description: 'Practice filling out web forms with various input types',
  },
  {
    title: 'Buttons',
    path: '/automation/buttons',
    description: 'Practice clicking different types of buttons',
  },
  {
    title: 'Dropdown',
    path: '/automation/dropdown',
    description: 'Practice selecting options from dropdowns',
  },
  {
    title: 'Mouse Over',
    path: '/automation/mouse-over',
    description: 'Practice mouse hover interactions',
  },
  {
    title: 'Drag and Drop',
    path: '/automation/drag-and-drop',
    description: 'Practice drag and drop interactions',
  },
  {
    title: 'Drawing in Canvas',
    path: '/automation/drawing-canvas',
    description: 'Practice drawing in a canvas element',
  },
  // Add more sections as needed
];

export const Automation: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8" data-testid="automation-page">
      <h1 className="text-3xl font-bold mb-6 dark:text-dark-heading">
        Test Automation Practice
      </h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {automationSections.map((section) => (
          <Link
            key={section.path}
            to={section.path}
            className="block p-6 bg-white dark:bg-dark-card rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
            data-testid={`automation-section-${section.title.toLowerCase().replace(/\s+/g, '-')}`}
          >
            <h2 className="text-xl font-semibold mb-2 dark:text-dark-heading">
              {section.title}
            </h2>
            <p className="text-gray-600 dark:text-dark-text">
              {section.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};
