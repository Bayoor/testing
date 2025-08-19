import express from "express";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { connectDB } from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";

// Only use dotenv in development
if (process.env.NODE_ENV !== "production") {
  const dotenv = await import("dotenv");
  dotenv.config();
}

const app = express();

const PORT = process.env.PORT || 3090;

// Middleware
app.use(express.json());

// API Routes
app.use("/api/products", productRoutes);

// Serve frontend in production
if (process.env.NODE_ENV === "production") {
  const frontendPath = path.join(__dirname, "..", "frontend", "dist");
  app.use(express.static(frontendPath));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "frontend", "dist", "index.html"));
  });
}

app.listen(PORT, async () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log("Environment variables check:");
  console.log("NODE_ENV:", process.env.NODE_ENV);
  console.log("MONGO_URI exists:", !!process.env.MONGO_URI);
  
  try {
    await connectDB();
    console.log("✅ Connected to database successfully");
  } catch (error) {
    console.error("❌ Failed to connect to database:", error.message);
    // Don't exit in production, let the server run for debugging
  }
});
