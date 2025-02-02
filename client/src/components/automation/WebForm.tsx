import React, { useState } from 'react';

export const WebForm: React.FC = () => {
  const [formData, setFormData] = useState({
    textInput: '',
    passwordInput: '',
    textArea: '',
    disabledInput: 'Disabled input',
    readOnlyInput: 'Readonly input',
    dateInput: '',
    fileInput: '',
    checkboxInput1: false,
    checkboxInput2: false,
    checkboxInput3: false,
    radioColor: '',
    dropdown: '',
    datalistInput: '',
    rangeInput: '50',
    colorInput: '#000000', // Add this new field
  });

  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setSuccessMessage('Form submitted successfully!');
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;
    const newValue =
      type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 dark:text-dark-heading">
        Web form
      </h2>
      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 p-4 mb-4">
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Left Column */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-dark-text">
                Text input
              </label>
              <input
                type="text"
                name="textInput"
                value={formData.textInput}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Text input"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-dark-text">
                Password
              </label>
              <input
                type="password"
                name="passwordInput"
                value={formData.passwordInput}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Password input"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-dark-text">
                Textarea
              </label>
              <textarea
                name="textArea"
                value={formData.textArea}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                rows={3}
                placeholder="Textarea input"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-dark-text">
                Disabled input
              </label>
              <input
                type="text"
                value={formData.disabledInput}
                disabled
                className="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-dark-text">
                Readonly input
              </label>
              <input
                type="text"
                value={formData.readOnlyInput}
                readOnly
                className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50"
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-dark-text">
                Date picker
              </label>
              <input
                type="date"
                name="dateInput"
                value={formData.dateInput}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-dark-text">
                File input
              </label>
              <input
                type="file"
                name="fileInput"
                onChange={handleChange}
                className="mt-1 block w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-2">
                Checkboxes
              </label>
              <div className="space-y-2">
                {[
                  'Default checkbox',
                  'Default checkbox 2',
                  'Default checkbox 3',
                ].map((label, index) => (
                  <label key={index} className="flex items-center">
                    <input
                      type="checkbox"
                      name={`checkboxInput${index + 1}`}
                      checked={
                        formData[
                          `checkboxInput${index + 1}` as keyof typeof formData
                        ] as boolean
                      }
                      onChange={handleChange}
                      className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                    <span className="ml-2">{label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-2">
                Radio buttons
              </label>
              <div className="space-y-2">
                {['Black', 'White', 'Yellow', 'Blue', 'Green'].map((color) => (
                  <label key={color} className="flex items-center">
                    <input
                      type="radio"
                      name="radioColor"
                      value={color.toLowerCase()}
                      checked={formData.radioColor === color.toLowerCase()}
                      onChange={handleChange}
                      className="border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                    <span className="ml-2">{color}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-dark-text">
                Select
              </label>
              <select
                name="dropdown"
                value={formData.dropdown}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">Open this select menu</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-dark-text">
                Datalist
              </label>
              <input
                list="browsers"
                name="datalistInput"
                value={formData.datalistInput}
                onChange={handleChange}
                placeholder="Type to search..."
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              <datalist id="browsers">
                <option value="Chrome" />
                <option value="Firefox" />
                <option value="Safari" />
                <option value="Edge" />
                <option value="Opera" />
              </datalist>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-dark-text">
                Range
              </label>
              <input
                type="range"
                name="rangeInput"
                value={formData.rangeInput}
                onChange={handleChange}
                min="0"
                max="100"
                className="mt-1 block w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-dark-text">
                Color picker
              </label>
              <input
                type="color"
                name="colorInput"
                value={formData.colorInput}
                onChange={handleChange}
                className="mt-1 block w-full h-10 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Submit form
          </button>
        </div>
      </form>
    </div>
  );
};
