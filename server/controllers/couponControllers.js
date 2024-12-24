import CouponCode from '../models/couponCode.js';

// Create coupon code
export const createCouponCode = async (req, res) => {
  try {
    const isCouponCodeExists = await CouponCode.findOne({
      name: req.body.name,
    });

    if (isCouponCodeExists) {
      return res.status(400).json({ success: false, message: "Coupon code already exists!" });
    }

    const couponCode = await CouponCode.create(req.body);

    res.status(201).json({
      success: true,
      couponCode,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get all coupons of a shop
export const getAllCouponCode = async (req, res) => {
  try {
    const couponCodes = await CouponCode.find({ shopId: req.seller.id });

    res.status(200).json({
      success: true,
      couponCodes,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Delete coupon code of a shop
export const deleteCouponCode = async (req, res) => {
  try {
    const couponCode = await CouponCode.findByIdAndDelete(req.params.id);

    if (!couponCode) {
      return res.status(400).json({ success: false, message: "Coupon code doesn't exist!" });
    }

    res.status(200).json({
      success: true,
      message: "Coupon code deleted successfully!",
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get coupon code value by its name
export const getCouponCodeByName = async (req, res) => {
  try {
    const couponCode = await CouponCode.findOne({ name: req.params.name });

    if (!couponCode) {
      return res.status(404).json({ success: false, message: "Coupon code not found!" });
    }

    res.status(200).json({
      success: true,
      couponCode,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
