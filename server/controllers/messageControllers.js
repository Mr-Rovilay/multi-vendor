import cloudinary from "../middleware/cloudinary.js";
import Messages from "../models/Messages.js";

// Create new message
export const createNewMessage = async (req, res, next) => {
  try {
    const { conversationId, sender, text, images } = req.body;

    const messageData = { conversationId, sender, text };

    // Handle image upload if provided
    if (images) {
      const myCloud = await cloudinary.v2.uploader.upload(images, {
        folder: "messages",
      });
      messageData.images = {
        public_id: myCloud.public_id,
        url: myCloud.url,
      };
    }

    // Create and save the message
    const message = new Messages(messageData);
    await message.save();

    res.status(201).json({
      success: true,
      message,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating new message",
      error: error.message,
    });
  }
};

// Get all messages with conversation ID
export const getAllMessage = async (req, res, next) => {
  try {
    const messages = await Messages.find({
      conversationId: req.params.id,
    });

    if (!messages.length) {
      return res.status(404).json({
        success: false,
        message: "No messages found for the given conversation ID",
      });
    }

    res.status(200).json({
      success: true,
      messages,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching messages",
      error: error.message,
    });
  }
};
