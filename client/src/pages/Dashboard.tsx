import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface Task {
  _id: string;
  title: string;
  description: string;
  status: 'todo' | 'in_progress' | 'done';
  dueDate?: string;
}

export const Dashboard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'todo',
    dueDate: '',
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    fetchTasks();
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const handleTaskCreated = (e: CustomEvent) => {
      setTasks((prev) => [...prev, e.detail]);
    };

    const handleTaskUpdated = (e: CustomEvent) => {
      setTasks((prev) =>
        prev.map((task) => (task._id === e.detail._id ? e.detail : task))
      );
    };

    const handleTaskDeleted = (e: CustomEvent) => {
      setTasks((prev) => prev.filter((task) => task._id !== e.detail._id));
    };

    window.addEventListener('taskCreated', handleTaskCreated as EventListener);
    window.addEventListener('taskUpdated', handleTaskUpdated as EventListener);
    window.addEventListener('taskDeleted', handleTaskDeleted as EventListener);

    return () => {
      window.removeEventListener(
        'taskCreated',
        handleTaskCreated as EventListener
      );
      window.removeEventListener(
        'taskUpdated',
        handleTaskUpdated as EventListener
      );
      window.removeEventListener(
        'taskDeleted',
        handleTaskDeleted as EventListener
      );
    };
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await api.get('/tasks');
      setTasks(response.data.tasks);
    } catch (err: any) {
      setError('Failed to fetch tasks');
    }
  };

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/tasks', formData);
      setIsModalOpen(false);
      setFormData({ title: '', description: '', status: 'todo', dueDate: '' });
      fetchTasks();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create task');
    }
  };

  const handleEditTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTask) return;

    try {
      await api.put(`/tasks/${editingTask._id}`, formData);
      setEditingTask(null);
      setFormData({ title: '', description: '', status: 'todo', dueDate: '' });
      fetchTasks();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update task');
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;

    try {
      await api.delete(`/tasks/${taskId}`);
      fetchTasks();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to delete task');
    }
  };

  const openEditModal = (task: Task) => {
    const formattedDate = task.dueDate
      ? new Date(task.dueDate).toISOString().split('T')[0]
      : '';
    setEditingTask(task);
    setFormData({
      title: task.title,
      description: task.description,
      status: task.status,
      dueDate: formattedDate,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8" data-testid="dashboard-page">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold" data-testid="dashboard-title">Your Tasks</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          data-testid="add-task-button"
        >
          Add New Task
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" data-testid="dashboard-error">
          {error}
        </div>
      )}

      {/* Task List */}
      <div className="grid gap-4" data-testid="task-list">
        {tasks.map((task) => (
          <div
            key={task._id}
            className="bg-white p-4 rounded-lg shadow border border-gray-200"
            data-testid={`task-${task._id}`}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg" data-testid={`task-title-${task._id}`}>{task.title}</h3>
                <p className="text-gray-600" data-testid={`task-description-${task._id}`}>{task.description}</p>
                <span
                  className={`inline-block px-2 py-1 rounded text-sm ${
                    task.status === 'done'
                      ? 'bg-green-100 text-green-800'
                      : task.status === 'in_progress'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-800'
                  }`}
                  data-testid={`task-status-${task._id}`}
                >
                  {task.status}
                </span>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => openEditModal(task)}
                  className="text-blue-500 hover:text-blue-700"
                  data-testid={`edit-task-button-${task._id}`}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteTask(task._id)}
                  className="text-red-500 hover:text-red-700"
                  data-testid={`delete-task-button-${task._id}`}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Create/Edit Task */}
      {(isModalOpen || editingTask) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" data-testid="task-modal">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4" data-testid="task-modal-title">
              {editingTask ? 'Edit Task' : 'Create New Task'}
            </h2>
            <form
              onSubmit={editingTask ? handleEditTask : handleCreateTask}
              className="space-y-4"
              data-testid="task-form"
            >
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Title:
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded"
                  required
                  data-testid="task-title-input"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Description:
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded"
                  data-testid="task-description-input"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Status:
                </label>
                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded"
                  data-testid="task-status-select"
                >
                  <option value="todo">To Do</option>
                  <option value="in_progress">In Progress</option>
                  <option value="done">Done</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Due Date:
                </label>
                <input
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) =>
                    setFormData({ ...formData, dueDate: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded"
                  data-testid="task-due-date-input"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditingTask(null);
                    setFormData({
                      title: '',
                      description: '',
                      status: 'todo',
                      dueDate: '',
                    });
                  }}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  data-testid="task-cancel-button"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  data-testid="task-submit-button"
                >
                  {editingTask ? 'Save Changes' : 'Create Task'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
