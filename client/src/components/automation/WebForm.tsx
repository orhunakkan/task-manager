import React, { useState } from 'react';

export const WebForm: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    jobTitle: '',
    education: '',
    sex: '',
    experience: '',
    date: '',
  });
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add form submission logic here
    setSuccessMessage('Form submitted successfully!');
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 p-4 mb-4">
          {successMessage}
        </div>
      )}
      <h2 className="text-2xl font-bold mb-6 dark:text-dark-heading">
        Complete Web Form
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-dark-text">
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            data-testid="first-name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-dark-text">
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            data-testid="last-name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-dark-text">
            Job Title
          </label>
          <input
            type="text"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            data-testid="job-title"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-dark-text">
            Education Level
          </label>
          <select
            name="education"
            value={formData.education}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            data-testid="education-level"
          >
            <option value="">Select education level</option>
            <option value="high-school">High School</option>
            <option value="college">College</option>
            <option value="grad-school">Grad School</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-dark-text">
            Sex
          </label>
          <div className="mt-1 space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="sex"
                value="male"
                checked={formData.sex === 'male'}
                onChange={handleChange}
                className="form-radio"
                data-testid="sex-male"
              />
              <span className="ml-2">Male</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="sex"
                value="female"
                checked={formData.sex === 'female'}
                onChange={handleChange}
                className="form-radio"
                data-testid="sex-female"
              />
              <span className="ml-2">Female</span>
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-dark-text">
            Years of Experience
          </label>
          <select
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            data-testid="years-of-experience"
          >
            <option value="">Select years</option>
            <option value="0-1">0-1</option>
            <option value="2-4">2-4</option>
            <option value="5-9">5-9</option>
            <option value="10+">10+</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-dark-text">
            Date
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            data-testid="date"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          data-testid="submit-form"
        >
          Submit
        </button>
      </form>
    </div>
  );
};
