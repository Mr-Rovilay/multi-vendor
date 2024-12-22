import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";
import fs from "fs";
import path from "path";

export const signup = async (req, res) => {
  try {
    const { name, email, password, role, contact } = req.body;

    
    const uploadsDir = path.join(process.cwd(), "uploads");
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }
    
    const avatar = req.file
    ? `/uploads/${req.file.filename}`
    : "https://res.cloudinary.com/daqnlvhjm/image/upload/v1687428069/avatars/default_avatar_jkwatz.png";

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      // Delete uploaded avatar file if user exists
      if (avatar) {
        const filePath = path.resolve(avatar);
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error(`Failed to delete avatar: ${filePath}`, err);
          } else {
            console.log(`Deleted avatar: ${filePath}`);
          }
        });
      }
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role,
      profile: {
        avatar,
        contact,
      },
    });

    // Save user to database
    await user.save();

    // Create and sign JWT token
    const token = jwt.sign(
      {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.profile.avatar, // Adjust if public URL is needed
      },
      process.env.JWT_SECRET || "defaultsecret", // Fallback secret for development
      { expiresIn: "1d" }
    );

    res.status(201).json({
      message: "User created successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        contact: user.profile.contact,
        avatar: user.profile.avatar, // Adjust if public URL is needed
      },
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Error signing up", error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Create and sign JWT token
    const token = jwt.sign(
      {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET || "defaultsecret", // Fallback secret for development
      { expiresIn: "1d" }
    );

    // Set the token in an HttpOnly cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      path: "/", // Ensure cookie is available across all routes
    });

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        contact: user.profile.contact,
        avatar: user.profile.avatar, // Adjust if public URL is needed
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};

export const getUser = async (req, res) => {

  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error("Get user error:", error);
    res.status(500).json({ message: error.message });
  }
};