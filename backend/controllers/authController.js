import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const createToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

// ==========================================
// USER RESPONSE HELPER
// ==========================================

const getUserResponse = (user) => {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    phone: user.phone || "",
    address: user.address || "",
    profession: user.profession || "",
    gender: user.gender || "",
    createdAt: user.createdAt,
  };
};

// ==========================================
// REGISTER
// ==========================================

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required.",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must contain at least 8 characters.",
      });
    }

    const existingUser = await User.findOne({
      email: email.toLowerCase(),
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "An account with this email already exists.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: "user",
    });

    const token = createToken(user);

    res.status(201).json({
      success: true,
      message: "Account created successfully.",
      token,
      user: getUserResponse(user),
    });
  } catch (error) {
    console.error("REGISTER ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Registration failed.",
    });
  }
};

// ==========================================
// USER LOGIN
// ==========================================

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    const user = await User.findOne({
      email: email.toLowerCase(),
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const token = createToken(user);

    res.status(200).json({
      success: true,
      message: "Login successful.",
      token,
      user: getUserResponse(user),
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Login failed.",
    });
  }
};

// ==========================================
// ADMIN LOGIN
// ==========================================

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body || {};

    // ==========================================
    // VALIDATION
    // ==========================================

    if (!email?.trim() || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    // ==========================================
    // FIND ACCOUNT
    // ==========================================

    const admin = await User.findOne({
      email: email.trim().toLowerCase(),
    });

    // ==========================================
    // ACCOUNT NOT FOUND
    // ==========================================

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Invalid admin credentials.",
      });
    }

    // ==========================================
    // ADMIN ROLE CHECK
    // ==========================================
    // Only MongoDB accounts with role = admin
    // are allowed to continue.

    if (admin.role !== "admin") {
      return res.status(403).json({
        success: false,
        message:
          "Access denied. This account is not an administrator.",
      });
    }

    // ==========================================
    // PASSWORD CHECK
    // ==========================================

    const passwordMatch = await bcrypt.compare(
      password,
      admin.password
    );

    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid admin credentials.",
      });
    }

    // ==========================================
    // CREATE ADMIN TOKEN
    // ==========================================

    const token = createToken(admin);

    // ==========================================
    // SUCCESS
    // ==========================================

    return res.status(200).json({
      success: true,
      message: "Admin login successful.",

      token,

      user: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error(
      "ADMIN LOGIN ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Admin login failed.",
    });
  }
};

// ==========================================
// UPDATE PROFILE
// ==========================================

export const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    const {
      name,
      phone,
      address,
      profession,
      gender,
    } = req.body;

    if (!name?.trim()) {
      return res.status(400).json({
        message: "Name is required.",
      });
    }

    user.name = name.trim();
    user.phone = phone?.trim() || "";
    user.address = address?.trim() || "";
    user.profession = profession?.trim() || "";
    user.gender = gender || "";

    await user.save();

    res.json({
      success: true,
      message: "Profile updated successfully.",
      user: getUserResponse(user),
    });
  } catch (error) {
    console.error(
      "UPDATE PROFILE ERROR:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to update profile.",
    });
  }
};