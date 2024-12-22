import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const shopSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your shop name"],
    trim: true
  },
  email: {
    type: String,
    required: [true, "Please enter your shop email"],
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minLength: [6, "Password should be greater than 6 characters"],
    select: false
  },
  description: {
    type: String,
  },
  phoneNumber: {
    type: String,
    required: [true, "Please enter your phone number"]
  },
  address: {
    type: String,
    required: [true, "Please enter your shop address"]
  },
  zipCode: {
    type: String,
    required: [true, "Please enter your zip code"]
  },
  avatar: {
    public_id: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    }
  },
  role: {
    type: String,
    default: "Seller"
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  resetPasswordToken: String,
  resetPasswordTime: Date
});

// Compare password
shopSchema.methods.comparePassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model('Shop', shopSchema);