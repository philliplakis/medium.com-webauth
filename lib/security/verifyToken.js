const jwt = require("jsonwebtoken");
const config = require("config");

function verifyToken(req, res, next) {
  const token = req.query.token || req.cookies.auth;
  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
    req.user = decoded;
    res.cookie("auth", token);
    next();
  } catch (ex) {
    res.status(400).send("Invalid token.");
  }
}

module.exports = verifyToken;
