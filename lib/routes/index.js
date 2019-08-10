const express = require("express");
const router = express.Router();
const verifyToken = require("../security/verifyToken");
const fidoAuth = require("../security/verifyFido");
const { User } = require("../../model/users");

// Render login page
router.get("/", (req, res) => {
  res.render("login");
});
// Render register page
router.get("/register", (req, res) => {
  res.render("register");
});
// Render dashbaord page
router.get("/dashboard", verifyToken, (req, res) => {
  res.render("index");
});
// Render Personal Infomation
router.get("/personal", verifyToken, fidoAuth, async (req, res) => {
  let user = await User.findOne({ _id: req.user._id });
  res.render("personal", { user });
});
// Clear cookie
router.get("/logout", (req, res) => {
  res.clearCookie("auth");
  return res.status(200).redirect("/");
});

module.exports = router;
