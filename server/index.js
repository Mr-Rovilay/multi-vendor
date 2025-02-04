import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import connectDB from "./db/db.js";
import authRoutes from "./routes/authRoutes.js";
import shopRoutes from "./routes/shopRoutes.js";
import productRoutes from "./routes/productRoutes.js";  
import eventRoutes from "./routes/eventRoutes.js"; 
import couponRoutes from "./routes/couponRoutes.js";
import conversationRoutes from "./routes/conversationRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import withdrawRoutes from "./routes/withdrawRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";


const PORT = process.env.PORT || 5000;
// Initialize the Express application
const app = express();
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  cors({
   origin: "https://vendor-l0ew.onrender.com",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
  })
);

app.use(cookieParser());

app.use("/auth", authRoutes);
app.use("/shop", shopRoutes);
app.use("/product", productRoutes);
app.use("/event", eventRoutes);
app.use("/coupon", couponRoutes);
app.use("/conversation", conversationRoutes);
app.use("/message", messageRoutes);
app.use("/order", orderRoutes);
app.use("/payment", paymentRoutes);
app.use("/withdraw", withdrawRoutes);



app.use("/", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("api working");
});

// Connect to the database and start the server
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to the database", err);
  });
