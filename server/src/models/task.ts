import mongoose, { Document, Schema } from 'mongoose';

// Define task status enum
export enum TaskStatus {
  TODO = 'todo',
  IN_PROGRESS = 'in_progress',
  DONE = 'done',
}

// Interface for Task document
interface ITask extends Document {
  title: string;
  description: string;
  status: TaskStatus;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  dueDate?: Date;
}

// Create the schema
const taskSchema = new Schema<ITask>(
  {
    title: {
      type: String,
      required: [true, 'Task title is required'],
      trim: true,
      maxlength: [100, 'Title cannot be more than 100 characters'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, 'Description cannot be more than 500 characters'],
    },
    status: {
      type: String,
      enum: Object.values(TaskStatus),
      default: TaskStatus.TODO,
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Task must belong to a user'],
    },
    dueDate: {
      type: Date,
      validate: {
        validator: function (value: Date) {
          return value >= new Date();
        },
        message: 'Due date cannot be in the past',
      },
    },
  },
  {
    timestamps: true,
  }
);

// Create indexes
taskSchema.index({ createdBy: 1, status: 1 });
taskSchema.index({ dueDate: 1 });

// Create and export the model
export const Task = mongoose.model<ITask>('Task', taskSchema);
