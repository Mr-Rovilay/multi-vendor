import cloudinary from "../middleware/cloudinary.js";
import Product from "../models/ProductModel.js";
import Shop from "../models/ShopModel.js";
// import Order from "../models/ShopOrder.js";

// Create Product
export const createProduct = async (req, res) => {
  try {
    const { shopId } = req.body;
    const shop = await Shop.findById(shopId);
    
    if (!shop) {
      return res.status(404).json({ success: false, message: "Shop not found" });
    }

    let images = Array.isArray(req.body.images) ? req.body.images : [req.body.images];
    const imagesLinks = await Promise.all(
      images.map(async (image) => {
        const result = await cloudinary.v2.uploader.upload(image, {
          folder: "products",
        });
        return {
          public_id: result.public_id,
          url: result.secure_url,
        };
      })
    );

    const productData = {
      ...req.body,
      images: imagesLinks,
      shop,
    };

    const product = await Product.create(productData);
    res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// Get All Products for a Shop
export const getAllProductShop = async (req, res) => {
  try {
    const products = await Product.find({ shopId: req.params.id });
    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// Delete Product of a shop
export const deleteShopProductId = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ 
        success: false, 
        message: "Product not found with this Id!" 
      });
    }

    // Delete images from cloudinary
    await Promise.all(
      product.images.map(async (image) => {
        await cloudinary.v2.uploader.destroy(image.public_id);
      })
    );

    await Product.findByIdAndDelete(req.params.id);

    res.status(201).json({
      success: true,
      message: "Product deleted successfully!",
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// Get All Products
export const getAllProduct = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// Create/Update Review
// export const createNewReview = async (req, res) => {
//   try {
//     const { user, rating, comment, productId, orderId } = req.body;

//     if (!user || !rating || !productId) {
//       return res.status(400).json({
//         success: false,
//         message: "Missing required fields",
//       });
//     }

//     const product = await Product.findById(productId);
    
//     if (!product) {
//       return res.status(404).json({
//         success: false,
//         message: "Product not found",
//       });
//     }

//     const review = {
//       user,
//       rating,
//       comment,
//       productId,
//     };

//     const reviewIndex = product.reviews.findIndex(
//       (rev) => rev.user._id.toString() === user._id.toString()
//     );

//     if (reviewIndex >= 0) {
//       // Update existing review
//       product.reviews[reviewIndex] = review;
//     } else {
//       // Add new review
//       product.reviews.push(review);
//     }

//     // Calculate average rating
//     const avgRating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / 
//                      product.reviews.length;
    
//     product.ratings = Number(avgRating.toFixed(1));

//     await product.save({ validateBeforeSave: false });

//     if (orderId) {
//       await Order.findByIdAndUpdate(
//         orderId,
//         { 
//           $set: { "cart.$[elem].isReviewed": true } 
//         },
//         { 
//           arrayFilters: [{ "elem._id": productId }], 
//           new: true 
//         }
//       );
//     }

//     res.status(200).json({
//       success: true,
//       message: "Review submitted successfully!",
//     });
//   } catch (error) {
//     res.status(500).json({ 
//       success: false, 
//       message: error.message 
//     });
//   }
// };

// Admin Get All Products
export const adminGetAllProduct = async (req, res) => {
  try {
    const products = await Product.find()
      .sort({ createdAt: -1 })
      .populate('shop', 'name'); // Optionally populate shop details

    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};