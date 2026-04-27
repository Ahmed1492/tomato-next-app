import mongoose from "mongoose";


const MONGODB_URL = process.env.MONGODB_URL;

// Stop app if link is missing
if (!MONGODB_URL) {
  throw new Error("Please define MONGODB_URL in .env.local");
}

// Get cached connection
let cached = global.mongoose;

// Create cache if not exists
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

// Function to connect DB
async function connectDB() {

  // Use existing connection
  if (cached.conn) return cached.conn;

  // Start connection once
  if (!cached.promise) {
    cached.promise = mongoose.connect(`${MONGODB_URL}/snap-shop`);
  }

  // Wait for connection
  cached.conn = await cached.promise;

  // Return connection
  return cached.conn;
}

export default connectDB; // Export function
