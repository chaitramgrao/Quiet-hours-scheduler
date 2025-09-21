// File: models/StudySession.ts
import mongoose, { Document, Model } from 'mongoose';

// Define what a StudySession document will look like
export interface IStudySession extends Document {
  user_id: string;
  title: string;
  start_time: Date;
  end_time: Date;
  email_sent: boolean;
  created_at: Date;
}

// Create the schema (the structure of the data)
const StudySessionSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  start_time: {
    type: Date,
    required: true,
  },
  end_time: {
    type: Date,
    required: true,
  },
  email_sent: {
    type: Boolean,
    default: false, // Default is false, becomes true after email is sent
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

// Create the model. If it already exists, use it; otherwise, create it.
const StudySession: Model<IStudySession> = 
  mongoose.models.StudySession || mongoose.model<IStudySession>('StudySession', StudySessionSchema);

export default StudySession;