import jwt from 'jsonwebtoken';

const userAuth = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: "Not Authenticated, Login Again" });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded?.id) {
      return res.status(401).json({ success: false, message: "Invalid Token" });
    }

    req.userID = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: error.message });
  }
};

export default userAuth;
