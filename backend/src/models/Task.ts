import mongoose, { Schema, Document } from 'mongoose';
import { ITask } from '../types';

export interface ITaskDocument extends ITask, Document {}

const TaskSchema: Schema = new Schema({
  title: {
    type: String,
    required: [true, 'Task title is required'],
    trim: true,
    maxlength: [100, 'Task title cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Task description is required'],
    trim: true,
    maxlength: [1000, 'Task description cannot exceed 1000 characters']
  },
  status: {
    type: String,
    enum: ['todo', 'in-progress', 'done'],
    default: 'todo',
    required: true
  },
  dueDate: {
    type: Date,
    validate: {
      validator: function(value: Date) {
        return !value || value > new Date();
      },
      message: 'Due date must be in the future'
    }
  },
  project: {
    type: Schema.Types.ObjectId,
    ref: 'Project',
    required: [true, 'Project is required'],
    index: true
  }
}, {
  timestamps: true,
  versionKey: false
});

// Indexes for better query performance
TaskSchema.index({ project: 1, status: 1 });
TaskSchema.index({ project: 1, createdAt: -1 });
TaskSchema.index({ status: 1 });

export default mongoose.model<ITaskDocument>('Task', TaskSchema);