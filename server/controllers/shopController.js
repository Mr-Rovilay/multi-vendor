import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import Shop from '../models/ShopModel.js';
import cloudinary from '../middleware/cloudinary.js';


const generateToken = (shop) => {
  return jwt.sign({ id: shop._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

// Helper function to generate token
export const createShop = async (req, res) => {
  try {
    const { name, email, password, phoneNumber, address, zipCode } = req.body;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Avatar file is required"
      });
    }

    const result = await cloudinary.v2.uploader.upload(req.file.path, {
      folder: 'shop-avatars',
      use_filename: true,
      unique_filename: false,
    });

    const avatarUrl = result.secure_url;
    const avatarPublicId = result.public_id;

    const existingShop = await Shop.findOne({ email });
    if (existingShop) {
      return res.status(400).json({
        success: false,
        message: "Shop already exists"
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const shop = new Shop({
      name,
      email,
      password: hashedPassword,
      phoneNumber,
      address,
      zipCode,
      avatar: {
        public_id: avatarPublicId,
        url: avatarUrl
      }
    });

    const token = generateToken(shop);

    // Save shop to the database
    await shop.save();

    res.status(201).json({
      success: true,
      message: "Shop created successfully",
      shop,
      token
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// Login shop function
export const loginShop = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide both email and password",
      });
    }

    // Find the shop by email
    const shop = await Shop.findOne({ email }).select("+password"); // Select the password field as it's excluded by default in the schema

    if (!shop) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await shop.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Generate a token
    const token = generateToken(shop);

    // Set the token in an HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Ensure cookies are secure in production
      sameSite: "strict", // Prevent CSRF
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      shop: {
        id: shop._id,
        name: shop.name,
        email: shop.email,
        avatar: shop.avatar,
        role: shop.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getShop = async (req, res) => {
  try {
    const seller = await Shop.findById(req.seller.id).select("-password");

    if (!seller) {
      return res.status(404).json({ message: "Shop not found" });
    }
    res.status(200).json({ success: true, seller });
  } catch (error) {
    console.error("Get shop error:", error);
    res.status(500).json({ message: error.message });
  }
};

export const logoutShop = (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};


