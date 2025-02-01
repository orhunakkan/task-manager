import React from 'react';

export const Home: React.FC = () => {
  return (
    <div className="text-center" data-testid="home-page">
      <h1 className="text-4xl font-bold text-gray-900 mb-4" data-testid="home-title">
        Welcome to Task Manager
      </h1>
      <p className="text-xl text-gray-600" data-testid="home-description">
        Manage your tasks efficiently
      </p>
    </div>
  );
};
