const express = require("express");
const app = express();
const mongoose = require("mongoose");
const hbs = require("express-handlebars");
const path = require("path");
const cookieParser = require("cookie-parser");

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost/webauthn", { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.error("Could not connect to MongoDB..."));

// Setting up Handlebars and Public folders
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "hbs");
app.engine(
  "hbs",
  hbs({
    extname: "hbs",
    defaultView: "default"
  })
);

// Basic Setup
app.use(express.json());
app.use(cookieParser());

const users = require("./lib/users");
const routes = require("./lib/routes");
app.use("/api/users", users);
app.use("/", routes);

// Set Port
const port = process.env.PORT || 3003;
app.listen(port, () => console.log(`Listening on port ${port}...`));
