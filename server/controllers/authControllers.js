import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";
import cloudinary from "../middleware/cloudinary.js";

const generateToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

export const signup = async (req, res) => {
  try {
    const { name, email, password, phoneNumber } = req.body;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Avatar file is required",
      });
    }

    const result = await cloudinary.v2.uploader.upload(req.file.path, {
      folder: "user-avatars",
      use_filename: true,
      unique_filename: false,
    });

    const avatarUrl = result.secure_url;
    const avatarPublicId = result.public_id;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
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
      phoneNumber,
      avatar: {
        public_id: avatarPublicId,
        url: avatarUrl,
      },
    });

    const token = generateToken(user);

    // Save user to database
    await user.save();

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user,
      token,
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
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Create and sign JWT token
    const token = generateToken(user);

    // Set the token in an HttpOnly cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
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
        phoneNumber: user.phoneNumber,
        avatar: user.avatar, // Adjust if public URL is needed
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

// Update user info
export const updateUserInfo = async (req, res) => {
  try {
    const { email, phoneNumber, name } = req.body;

    const user = await User.findOne({ email }).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not Found" });
    }


    user.name = name;
    user.email = email;
    user.phoneNumber = phoneNumber;

    await user.save();

    res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Update user info error:", error);
    res.status(500).json({ message: error.message });
  }
};

// Update user avatar
export const updateAvatar = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.avatar?.public_id) {
      await cloudinary.v2.uploader.destroy(user.avatar.public_id);
    }

    const uploaded = await cloudinary.v2.uploader.upload(req.file.path, {
      folder: "user-avatars",
      width: 150,
    });

    user.avatar = { public_id: uploaded.public_id, url: uploaded.secure_url };
    await user.save();

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("Update avatar error:", error);
    res.status(500).json({ message: error.message });
  }
};

// update user addresses
export const updateUserAddress = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const { addressType, _id, ...rest } = req.body;

    const existingAddress = user.addresses.find(
      (address) => address._id == _id
    );
    if (existingAddress) {
      Object.assign(existingAddress, rest);
    } else if (
      user.addresses.some((addr) => addr.addressType === addressType)
    ) {
      return res.status(400).json({ message: "Address type already exists" });
    } else {
      user.addresses.push(req.body);
    }

    await user.save();
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("Update address error:", error);
    res.status(500).json({ message: error.message });
  }
};

// Delete user address
export const deleteUserAddress = async (req, res) => {
  try {
    const userId = req.user.id;
    const addressId = req.params.id;

    await User.updateOne(
      { _id: userId },
      { $pull: { addresses: { _id: addressId } } }
    );

    const user = await User.findById(userId);
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("Delete address error:", error);
    res.status(500).json({ message: error.message });
  }
};

// Update user password
export const updatePassword = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("+password");

    if (!(await bcrypt.compare(req.body.oldPassword, user.password))) {
      return res.status(401).json({ message: "Old password is incorrect" });
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    user.password = await bcrypt.hash(req.body.newPassword, 10);
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Update password error:", error);
    res.status(500).json({ message: error.message });
  }
};

// Get user info by ID
export const getUserInfo = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("Get user info error:", error);
    res.status(500).json({ message: error.message });
  }
};

// Get all users (Admin)
export const adminGetAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort({
      createdAt: -1,
    });
    res.status(201).json({
      success: true,
      users,
    });
  } catch (error) {
    console.error("Get all users error:", error);
    res.status(500).json({ message: error.message });
  }
};

// Delete user (Admin)
export const adminDeleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const imageId = user.avatar?.public_id;

    if (imageId) {
      await cloudinary.v2.uploader.destroy(imageId);
    }

    await User.findByIdAndDelete(req.params.id);

    res.status(201).json({
      success: true,
      message: "User deleted successfully!",
    });
  } catch (error) {
    console.error("Delete user error:", error);
    res.status(500).json({ message: error.message });
  }
};
