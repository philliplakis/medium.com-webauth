const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { User } = require("../../model/users");
const verifyToken = require("../security/verifyToken");

/* POST register */
router.post("/register", async (req, res) => {
  if (!req.body) return res.status(400).send("No Body Attached");

  if (!req.body.password)
    return res.status(400).send("You have to pass a password.");

  user = new User(_.pick(req.body, ["email", "name", "username", "password"]));

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  user.webauthn = { active: false, authenticators: [] };

  await user.save();

  res.status(200);
});

/* POST login */
router.post("/login", async (req, res) => {
  if (!req.body) return res.status(400).send("No Body");

  let user = await User.findOne({ username: req.body.username });
  if (!user) return res.status(400).send("Invalid username or password.");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.status(400).send("Invalid username or password.");

  const token = user.generateAuthToken();
  res.json({ status: "ok", token });
});

// validate token and send to Dashbaord
router.get("/auth", verifyToken, (req, res) => {
  res.redirect("/dashboard");
});

module.exports = router;
