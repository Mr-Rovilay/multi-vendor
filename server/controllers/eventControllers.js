import cloudinary from "../middleware/cloudinary.js";
import Event from "../models/eventModel.js";
import Shop from "../models/ShopModel.js";

// Create Product
export const createProductEvent = async (req, res) => {
  try {
    const { shopId } = req.body;
    const shop = await Shop.findById(shopId);

    if (!shop) {
      return res
        .status(404)
        .json({ success: false, message: "Shop not found" });
    }

    let images = Array.isArray(req.body.images)
      ? req.body.images
      : [req.body.images];
    const imagesLinks = await Promise.all(
      images.map(async (image) => {
        const result = await cloudinary.v2.uploader.upload(image, {
          folder: "events",
        });
        return {
          public_id: result.public_id,
          url: result.secure_url,
        };
      })
    );

    const eventData = {
      ...req.body,
      images: imagesLinks,
      shop,
    };

    const eventProduct = await Event.create(eventData);

    res.status(201).json({
      success: true,
      eventProduct,
    });
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// get all events of a shop id
export const getAllEventShop = async (req, res) => {
  try {
    const events = await Event.find({ shopId: req.params.id });
    res.status(200).json({
      success: true,
      events,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Product of a shop
export const deleteEventShopProductId = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event Product not found with this Id!",
      });
    }

    // Delete images from cloudinary
    await Promise.all(
      event.images.map(async (image) => {
        await cloudinary.v2.uploader.destroy(image.public_id);
      })
    );

    await Event.findByIdAndDelete(req.params.id);

    res.status(201).json({
      success: true,
      message: "Product Event deleted successfully!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Products
export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      events,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Admin Get All Products
export const adminGetAllEvents = async (req, res) => {
  try {
    const events = await Event.find()
      .sort({ createdAt: -1 })
      .populate("shop", "name"); // Optionally populate shop details

    res.status(200).json({
      success: true,
      events,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
