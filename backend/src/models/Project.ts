import mongoose, { Schema, Document } from 'mongoose';
import { IProject } from '../types';

export interface IProjectDocument extends IProject, Document {}

const ProjectSchema: Schema = new Schema({
  title: {
    type: String,
    required: [true, 'Project title is required'],
    trim: true,
    maxlength: [100, 'Project title cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Project description is required'],
    trim: true,
    maxlength: [1000, 'Project description cannot exceed 1000 characters']
  },
  status: {
    type: String,
    enum: ['active', 'completed'],
    default: 'active',
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User is required'],
    index: true
  }
}, {
  timestamps: true,
  versionKey: false
});

// Indexes for better query performance
ProjectSchema.index({ user: 1, status: 1 });
ProjectSchema.index({ user: 1, createdAt: -1 });

// Cascade delete tasks when project is deleted
ProjectSchema.pre('deleteOne', { document: true, query: false }, async function() {
  const Task = mongoose.model('Task');
  await Task.deleteMany({ project: this._id });
});

export default mongoose.model<IProjectDocument>('Project', ProjectSchema);