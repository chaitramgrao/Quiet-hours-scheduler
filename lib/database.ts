// File: lib/database.ts
import mongoose from 'mongoose'

// Get the connection string from your environment variable
const MONGODB_URI = process.env.MONGODB_URI

// If the connection string is missing, throw an error
if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local')
}

// This is a simple connection function without the complex caching
async function dbConnect() {
  // Check if we're already connected
  if (mongoose.connection.readyState === 1) {
    return mongoose;
  }

  try {
    // Connect to MongoDB - we use ! to tell TypeScript MONGODB_URI is definitely a string
    await mongoose.connect(MONGODB_URI!);
    console.log('Connected to MongoDB successfully');
    return mongoose;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

export default dbConnect;