import mongoose from "mongoose";
import Dotenv from 'dotenv'

Dotenv.config();
const connectDB = async () => {
    const URI =process.env.URI;
  try {
    await mongoose.connect( URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

export default connectDB;
