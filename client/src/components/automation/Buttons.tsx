import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const Buttons: React.FC = () => {
  const [message, setMessage] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleBtnClick = (description: string) => {
    setMessage(description);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      {message && (
        <div className="bg-indigo-100 border text-indigo-700 p-4 mb-4">
          {message}
        </div>
      )}
      <h2 className="text-2xl font-bold mb-6 dark:text-dark-heading">
        Buttons
      </h2>

      {/* Basic Buttons */}
      <div className="space-x-2 mb-4">
        <button
          onClick={() => handleBtnClick('Primary button clicked')}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          data-testid="primary-button"
        >
          Primary
        </button>
        <button
          onClick={() => handleBtnClick('Secondary button clicked')}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          data-testid="secondary-button"
        >
          Secondary
        </button>
        <button
          onClick={() => handleBtnClick('Danger button clicked')}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          data-testid="danger-button"
        >
          Danger
        </button>
      </div>

      {/* Outline / Disabled Buttons */}
      <div className="space-x-2 mb-4">
        <button
          onClick={() => handleBtnClick('Outline button clicked')}
          className="border border-blue-500 text-blue-500 px-4 py-2 rounded hover:bg-blue-50"
          data-testid="outline-button"
        >
          Outline
        </button>
        <button
          disabled
          className="bg-gray-200 text-gray-500 px-4 py-2 rounded"
          data-testid="disabled-button"
        >
          Disabled
        </button>
      </div>

      {/* Button Group */}
      <div className="inline-flex mb-4">
        <button
          onClick={() => handleBtnClick('Left clicked')}
          className="bg-blue-500 text-white px-4 py-2 rounded-l hover:bg-blue-600"
          data-testid="group-left"
        >
          Left
        </button>
        <button
          onClick={() => handleBtnClick('Middle clicked')}
          className="bg-blue-500 text-white px-4 py-2 hover:bg-blue-600"
          data-testid="group-middle"
        >
          Middle
        </button>
        <button
          onClick={() => handleBtnClick('Right clicked')}
          className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600"
          data-testid="group-right"
        >
          Right
        </button>
      </div>

      {/* Dropdown-like Button */}
      <div className="relative inline-block mb-4 ml-4">
        <button
          onClick={toggleDropdown}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          data-testid="dropdown-button"
        >
          Dropdown ▼
        </button>
        {isDropdownOpen && (
          <div className="absolute left-0 mt-2 w-40 bg-white border rounded shadow-lg">
            <button
              onClick={() => handleBtnClick('Action 1 clicked')}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              Action 1
            </button>
            <button
              onClick={() => handleBtnClick('Action 2 clicked')}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              Action 2
            </button>
          </div>
        )}
      </div>

      {/* Button with Link */}
      <div className="mb-4">
        <Link to="/some-path">
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            data-testid="link-button"
          >
            Go to Some Path
          </button>
        </Link>
      </div>
    </div>
  );
};
