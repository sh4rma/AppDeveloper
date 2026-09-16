import "dotenv/config";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "./models/User.js";

const resetAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected.");

    const newPassword = "Mein10AdminHu";

    const hashedPassword = await bcrypt.hash(
      newPassword,
      12
    );

    const admin = await User.findOneAndUpdate(
      {
        email: "admin@appdeveloper.com",
      },
      {
        $set: {
          password: hashedPassword,
          role: "admin",
        },
      },
      {
        new: true,
      }
    );

    if (!admin) {
      console.log(
        "❌ Admin account not found."
      );

      return;
    }

    console.log(
      "================================"
    );

    console.log(
      "✅ ADMIN PASSWORD RESET SUCCESS"
    );

    console.log(
      "Email:",
      admin.email
    );

    console.log(
      "Role:",
      admin.role
    );

    console.log(
      "New Password:",
      newPassword
    );

    console.log(
      "================================"
    );

  } catch (error) {
    console.error(
      "❌ RESET ERROR:",
      error
    );
  } finally {
    await mongoose.disconnect();
  }
};

resetAdmin();