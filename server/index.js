import express from 'express';
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import connectDB from "./db/db.js";
import authRoutes from './routes/authRoutes.js';





const PORT = process.env.PORT || 5000;
// Initialize the Express application
const app = express();
app.use(bodyParser.json());
app.use(cookieParser());    

// Set up middlewares
app.use(cors(
  {
    origin: "http://localhost:5173", // allow requests from this origin
    credentials: true, // allow cookies
  } 
));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json()); 


  app.use('/auth', authRoutes);
  app.use("/", express.static("uploads"))


app.get("/", (req,res)=> {
    res.send("api working")
})

// Connect to the database and start the server
connectDB().then(() => {
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });

  }).catch(err => {
    console.error("Failed to connect to the database", err);
  });