
import Shop from "../models/ShopModel.js";
import Withdraw from "../models/Withdraw.js";
// import sendMail from "../utils/sendMail.js";

// create withdraw request --- only for seller
export const createWithdrawRequest = async (req, res) => {
  try {
    const { amount } = req.body;

    const data = {
      seller: req.seller,
      amount,
    };

    try {
      await sendMail({
        email: req.seller.email,
        subject: "Withdraw Request",
        message: `Hello ${req.seller.name}, Your withdraw request of ${amount}$ is processing. It will take 3 to 7 days to process!`,
      });
      res.status(201).json({
        success: true,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }

    const withdraw = await Withdraw.create(data);

    const shop = await Shop.findById(req.seller._id);

    shop.availableBalance = shop.availableBalance - amount;

    await shop.save();

    res.status(201).json({
      success: true,
      withdraw,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// get all withdraw requests --- admin
export const getAllWithdrawRequests = async (req, res) => {
  try {
    const withdraws = await Withdraw.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      withdraws,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// update withdraw request ---- admin
export const updateWithdrawRequest = async (req, res) => {
  try {
    const { sellerId } = req.body;

    const withdraw = await Withdraw.findByIdAndUpdate(
      req.params.id,
      {
        status: "succeed",
        updatedAt: Date.now(),
      },
      { new: true }
    );

    const seller = await Shop.findById(sellerId);

    const transaction = {
      _id: withdraw._id,
      amount: withdraw.amount,
      updatedAt: withdraw.updatedAt,
      status: withdraw.status,
    };

    seller.transections = [...seller.transections, transaction];

    await seller.save();

    // try {
    //   await sendMail({
    //     email: seller.email,
    //     subject: "Payment Confirmation",
    //     message: `Hello ${seller.name}, Your withdraw request of ${withdraw.amount}$ is on the way. Delivery time depends on your bank's rules; it usually takes 3 to 7 days.`,
    //   });
    // } catch (error) {
    //   res.status(500).json({
    //     success: false,
    //     message: error.message,
    //   });
    // }

    res.status(201).json({
      success: true,
      withdraw,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
