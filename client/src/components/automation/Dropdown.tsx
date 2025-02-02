import React, { useState } from 'react';

export const Dropdown: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 dark:text-dark-heading">Dropdown</h2>
      <select
        className="border rounded px-4 py-2"
        value={selectedOption}
        onChange={handleChange}
        data-testid="sample-dropdown"
      >
        <option value="">Select an option</option>
        <option value="one">Option One</option>
        <option value="two">Option Two</option>
        <option value="three">Option Three</option>
      </select>
      {selectedOption && (
        <div className="mt-4">
          You selected: <strong>{selectedOption}</strong>
        </div>
      )}
    </div>
  );
};