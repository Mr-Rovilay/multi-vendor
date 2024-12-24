import Conversation from "../models/conversation.js";

// Create a new conversation
export const createConversation = async (req, res, next) => {
  try {
    const { groupTitle, userId, sellerId } = req.body;

    const isConversationExist = await Conversation.findOne({ groupTitle });

    if (isConversationExist) {
      res.status(200).json({
        success: true,
        conversation: isConversationExist,
      });
    } else {
      const conversation = await Conversation.create({
        members: [userId, sellerId],
        groupTitle: groupTitle,
      });

      res.status(201).json({
        success: true,
        conversation,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating conversation",
      error: error.message,
    });
  }
};

// Get seller conversations
export const getSellerConversation = async (req, res, next) => {
  try {
    const conversations = await Conversation.find({
      members: {
        $in: [req.params.id],
      },
    }).sort({ updatedAt: -1, createdAt: -1 });

    res.status(200).json({
      success: true,
      conversations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching seller conversations",
      error: error.message,
    });
  }
};

// Get user conversations
export const getUserConversation = async (req, res, next) => {
  try {
    const conversations = await Conversation.find({
      members: {
        $in: [req.params.id],
      },
    }).sort({ updatedAt: -1, createdAt: -1 });

    res.status(200).json({
      success: true,
      conversations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching user conversations",
      error: error.message,
    });
  }
};

// Update the last message
export const updateLastMessage = async (req, res, next) => {
  try {
    const { lastMessage, lastMessageId } = req.body;

    const conversation = await Conversation.findByIdAndUpdate(
      req.params.id,
      {
        lastMessage,
        lastMessageId,
      },
      { new: true } // Return the updated document
    );

    if (!conversation) {
      return res.status(404).json({
        success: false,
        message: "Conversation not found",
      });
    }

    res.status(200).json({
      success: true,
      conversation,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating last message",
      error: error.message,
    });
  }
};
