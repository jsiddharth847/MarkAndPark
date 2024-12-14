const jwt = require("jsonwebtoken");

// Generate a JWT token
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      role: user.role, // Include the role in the token payload
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
};

// Verify the JWT token
const verifyToken = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1]; // Extract the token from the Bearer string
  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    // Decode and verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach the decoded user details to the request object
    next();
  } catch (err) {
    res.status(400).json({ error: "Invalid token." });
  }
};

// Middleware to authorize based on roles
const authorizeRoles =
  (...roles) =>
  (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ error: "Access denied. You do not have the required role." });
    }
    next();
  };

module.exports = { generateToken, verifyToken, authorizeRoles };
