import jwt from 'jsonwebtoken';

export const verifyToken = async (req, res, next) => {
  console.log('Full Cookies:', req.cookies);
  console.log('Token from cookies:', req.cookies.token);
  console.log('Authorization Header:', req.headers.authorization);

  const token = req.cookies.token;
  console.log(token)

  if (!token) {
    console.error('No token found in cookies');
    return res.status(401).json({ message: 'Access denied, no token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded Token:', decoded);
    req.user = decoded;
    next();
  } catch (err) {
    console.error('Token Verification Error:', err);
    return res.status(403).json({ message: 'Invalid or expired token.' });
  }
};



