import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routes/authRoutes.js";
import appRoutes from "./routes/appRoutes.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

// ==========================================
// PATH
// ==========================================

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ==========================================
// MIDDLEWARE
// ==========================================

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://evstore.netlify.app",
    ],
    methods: [
      "GET",
      "POST",
      "PUT",
      "DELETE",
      "PATCH",
      "OPTIONS",
    ],
    credentials: true,
  })
);

app.use(
  express.json({
    limit: "10mb",
  })
);

app.use(
  express.urlencoded({
    extended: true,
    limit: "10mb",
  })
);

// ==========================================
// MONGODB CONNECTION
// ==========================================

const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    return;
  }

  await mongoose.connect(process.env.MONGO_URI);

  console.log("MongoDB connected successfully ✅");
};

// Connect MongoDB before API requests
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error("MongoDB connection failed ❌");
    console.error(error.message);

    return res.status(500).json({
      success: false,
      message: "Database connection failed.",
    });
  }
});

// ==========================================
// STATIC FILES
// ==========================================

app.use(
  "/uploads",
  express.static(
    path.join(__dirname, "uploads")
  )
);

// ==========================================
// API ROUTES
// ==========================================

app.use("/api", appRoutes);

app.use("/api/auth", authRoutes);

// ==========================================
// HOME
// ==========================================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "AppDeveloper API is running 🚀",
    version: "1.0.0",
  });
});

// ==========================================
// 404
// ==========================================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API endpoint not found.",
  });
});

// ==========================================
// GLOBAL ERROR HANDLER
// ==========================================

app.use((error, req, res, next) => {
  console.error("SERVER ERROR:", error);

  if (error.name === "MulterError") {
    return res.status(400).json({
      success: false,
      message: `Upload error: ${error.message}`,
    });
  }

  res.status(500).json({
    success: false,
    message:
      error.message || "Internal server error.",
  });
});

// ==========================================
// LOCAL SERVER
// ==========================================

// Local development ke liye
// Vercel par app.listen nahi chalega.

if (process.env.VERCEL !== "1") {
  connectDB()
    .then(() => {
      app.listen(PORT, () => {
        console.log(
          `Server running on http://localhost:${PORT}`
        );
      });
    })
    .catch((error) => {
      console.error(
        "MongoDB connection failed ❌"
      );
      console.error(error.message);
    });
}

// ==========================================
// VERCEL EXPORT
// ==========================================

export default app;