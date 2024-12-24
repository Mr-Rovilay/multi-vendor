import Order from "../models/Order.js";
import Product from "../models/ProductModel.js";
import Shop from "../models/ShopModel.js";


// Create new orders (grouped by shopId)
export const createOrder = async (req, res) => {
  try {
    const { cart, shippingAddress, user, totalPrice, paymentInfo } = req.body;

    // Group cart items by shopId
    const shopItemsMap = new Map();
    cart.forEach((item) => {
      const shopId = item.shopId;
      if (!shopItemsMap.has(shopId)) {
        shopItemsMap.set(shopId, []);
      }
      shopItemsMap.get(shopId).push(item);
    });

    // Create an order for each shop
    const orders = [];
    for (const [shopId, items] of shopItemsMap) {
      const order = await Order.create({
        cart: items,
        shippingAddress,
        user,
        totalPrice,
        paymentInfo,
      });
      orders.push(order);
    }

    res.status(201).json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all orders of a user
export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ "user._id": req.params.userId }).sort({
      createdAt: -1,
    });

    if (!orders.length) {
      return res.status(404).json({
        success: false,
        message: "No orders found for this user.",
      });
    }

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all orders for a seller
export const getSellerOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      "cart.shopId": req.params.shopId,
    }).sort({
      createdAt: -1,
    });

    if (!orders.length) {
      return res.status(404).json({
        success: false,
        message: "No orders found for this shop.",
      });
    }

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update order status for a seller
export const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found.",
      });
    }

    if (req.body.status === "Transferred to delivery partner") {
      for (const o of order.cart) {
        await updateOrder(o._id, o.qty);
      }
    }

    order.status = req.body.status;

    if (req.body.status === "Delivered") {
      order.deliveredAt = Date.now();
      order.paymentInfo.status = "Succeeded";
      const serviceCharge = order.totalPrice * 0.10;
      await updateSellerInfo(order.totalPrice - serviceCharge);
    }

    await order.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
      order,
    });

    async function updateOrder(id, qty) {
      const product = await Product.findById(id);
      product.stock -= qty;
      product.sold_out += qty;
      await product.save({ validateBeforeSave: false });
    }

    async function updateSellerInfo(amount) {
      const seller = await Shop.findById(order.cart[0].shopId);
      seller.availableBalance = amount;
      await seller.save();
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Refund request by user
export const requestRefund = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found.",
      });
    }

    order.status = req.body.status;
    await order.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
      order,
      message: "Order refund request successfully submitted!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Refund success by seller
export const acceptRefund = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found.",
      });
    }

    order.status = req.body.status;
    await order.save();

    res.status(200).json({
      success: true,
      message: "Order refund successfully processed!",
    });

    if (req.body.status === "Refund Success") {
      for (const o of order.cart) {
        await updateOrder(o._id, o.qty);
      }
    }

    async function updateOrder(id, qty) {
      const product = await Product.findById(id);
      product.stock += qty;
      product.sold_out -= qty;
      await product.save({ validateBeforeSave: false });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all orders for admin
export const getAllOrdersForAdmin = async (req, res) => {
  try {
    const orders = await Order.find().sort({
      deliveredAt: -1,
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
