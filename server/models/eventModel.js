import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your event product name!"],
  },
  description: {
    type: String,
    required: [true, "Please enter your event product description!"],
  },
  category: {
    type: String,
    required: [true, "Please enter your event product category!"],
  },
  startDate: {
    // Changed from start_Date
    type: Date,
    required: true,
  },
  endDate: {
    // Changed from finish_Date
    type: Date,
    required: true,
  },

  status: {
    type: String,
    default: "running",
  },
  tags: {
    type: String,
    required: [true, "Please enter your event product tags!"],
  },
  originalPrice: {
    type: Number,
  },
  discountPrice: {
    type: Number,
    required: [true, "Please enter your event product price!"],
  },
  stock: {
    type: Number,
    required: [true, "Please enter your event product stock!"],
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  shopId: {
    type: String,
    required: true,
  },
  shop: {
    type: Object,
    required: true,
  },
  sold_out: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Event = mongoose.model("Events", eventSchema);
export default Event;
