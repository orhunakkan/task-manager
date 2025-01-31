import express, { Request, Response } from 'express';
import { Task, TaskStatus } from '../models/task';
import { authenticateUser } from '../middleware/auth';

/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       required:
 *         - title
 *       properties:
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         status:
 *           type: string
 *           enum: [todo, in_progress, done]
 *         dueDate:
 *           type: string
 *           format: date
 */

const router = express.Router();

/**
 * @swagger
 * /api/tasks:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       201:
 *         description: Task created successfully
 */
router.post('/', authenticateUser, async (req: Request, res: Response) => {
  try {
    const task = new Task({
      ...req.body,
      createdBy: req.user?.userId,
    });
    await task.save();

    res.status(201).json({
      status: 'success',
      task,
    });
  } catch (error: any) {
    res.status(400).json({
      status: 'error',
      message: error.message,
    });
  }
});

/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Get all tasks for authenticated user
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 */
router.get('/', authenticateUser, async (req: Request, res: Response) => {
  try {
    const tasks = await Task.find({ createdBy: req.user?.userId });
    res.json({
      status: 'success',
      count: tasks.length,
      tasks,
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
});

// Get single task
router.get('/:id', authenticateUser, async (req: Request, res: Response) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      createdBy: req.user?.userId,
    });

    if (!task) {
      res.status(404).json({
        status: 'error',
        message: 'Task not found',
      });
      return;
    }

    res.json({
      status: 'success',
      task,
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
});

// Update task
router.put('/:id', authenticateUser, async (req: Request, res: Response) => {
  try {
    const task = await Task.findOneAndUpdate(
      {
        _id: req.params.id,
        createdBy: req.user?.userId,
      },
      req.body,
      { new: true, runValidators: true }
    );

    if (!task) {
      res.status(404).json({
        status: 'error',
        message: 'Task not found',
      });
      return;
    }

    res.json({
      status: 'success',
      task,
    });
  } catch (error: any) {
    res.status(400).json({
      status: 'error',
      message: error.message,
    });
  }
});

// Delete task
router.delete('/:id', authenticateUser, async (req: Request, res: Response) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user?.userId,
    });

    if (!task) {
      res.status(404).json({
        status: 'error',
        message: 'Task not found',
      });
      return;
    }

    res.json({
      status: 'success',
      message: 'Task deleted',
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
});

export default router;
