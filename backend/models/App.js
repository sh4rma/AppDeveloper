import mongoose from "mongoose";

const appSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    developer: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    version: {
      type: String,
      required: true,
      trim: true,
    },

    android: {
      type: String,
      required: true,
      trim: true,
    },

    iconUrl: {
      type: String,
      required: true,
    },

    apkUrl: {
      type: String,
      required: true,
    },

    screenshots: {
      type: [String],
      required: true,
    },

    size: {
      type: String,
      default: "Unknown",
    },

    rating: {
      type: Number,
      default: 0,
    },

    downloads: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: ["pending", "published", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const App = mongoose.model("App", appSchema);

export default App;