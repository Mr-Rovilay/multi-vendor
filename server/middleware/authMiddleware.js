import jwt from 'jsonwebtoken';

export const verifyToken = async (req, res, next) => {

  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'Access denied, no token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.error('Token Verification Error:', err);
    return res.status(403).json({ message: 'Invalid or expired token.' });
  }
};

export const authenticateShop = async (req, res, next) => {
  const token = req.cookies.token; // Assuming token is stored in cookies
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.seller = decoded
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(401).json({ message: "Token is not valid" });
  }
};



