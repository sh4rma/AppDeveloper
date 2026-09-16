import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import authRoutes from "./routes/authRoutes.js";

import appRoutes from "./routes/appRoutes.js";

dotenv.config();

const app = express();

const PORT =
  process.env.PORT || 5000;


// ==========================================
// PATH
// ==========================================

const __filename =
  fileURLToPath(import.meta.url);

const __dirname =
  path.dirname(__filename);


// ==========================================
// MIDDLEWARE
// ==========================================


app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
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
// STATIC FILES
// ==========================================

app.use(
  "/uploads",
  express.static(
    path.join(
      __dirname,
      "uploads"
    )
  )
);


// ==========================================
// API ROUTES
// ==========================================

app.use(
  "/api",
  appRoutes
);
app.use("/api/auth", authRoutes);


// ==========================================
// HOME
// ==========================================

app.get("/", (req, res) => {

  res.status(200).json({
    success: true,

    message:
      "AppDeveloper API is running 🚀",

    version: "1.0.0",
  });

});


// ==========================================
// 404
// ==========================================

app.use(
  (req, res) => {

    res.status(404).json({
      success: false,

      message:
        "API endpoint not found.",
    });

  }
);


// ==========================================
// GLOBAL ERROR HANDLER
// ==========================================

app.use(
  (error, req, res, next) => {

    console.error(
      "SERVER ERROR:",
      error
    );


    if (
      error.name ===
      "MulterError"
    ) {

      return res.status(400).json({
        success: false,

        message:
          `Upload error: ${error.message}`,
      });

    }


    res.status(500).json({
      success: false,

      message:
        error.message ||
        "Internal server error.",
    });

  }
);


// ==========================================
// MONGODB
// ==========================================

mongoose
  .connect(
    process.env.MONGO_URI
  )

  .then(() => {

    console.log(
      "MongoDB connected successfully ✅"
    );


    app.listen(
      PORT,
      () => {

        console.log(
          `Server running on http://localhost:${PORT}`
        );

      }
    );

  })

  .catch((error) => {

    console.error(
      "MongoDB connection failed ❌"
    );

    console.error(
      error.message
    );

  });