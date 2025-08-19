import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        console.log("Attempting to connect to MongoDB...");
        console.log("MONGO_URI exists:", !!process.env.MONGO_URI);
        console.log("MONGO_URI length:", process.env.MONGO_URI ? process.env.MONGO_URI.length : 0);
        
        if (!process.env.MONGO_URI) {
            throw new Error("MONGO_URI environment variable is not defined");
        }
        
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`✅ MongoDB connected: ${conn.connection.host}`);
        return conn;
    } catch (error) {
        console.error(`❌ MongoDB connection error: ${error.message}`);
        console.error("Full error:", error);
        throw error; // Don't exit process, let Vercel handle it
    }
}