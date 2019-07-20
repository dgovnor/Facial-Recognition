const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const Knex = require("knex");
const bcrypt = require("bcrypt");
const signinControl = require("./Controller/signinControl");
const registerControl = require("./Controller/registerControl");
const profileControl = require("./Controller/profileControl");
const imageControl = require("./Controller/imageControl");

const app = express();
const db = Knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "postgres",
    password: "password",
    database: "image-app"
  }
});

app.use(bodyParser.json());

app.use(cors());

const { handleSignin } = signinControl;
const { handleRegister } = registerControl;
const { profile } = profileControl;
const { image, imageUrl } = imageControl;

app.get("/", (req, res) => {
  res.json("Welcome");
});
app.post("/signin", (req, res) => handleSignin(req, res, db, bcrypt));

app.post("/register", (req, res) => handleRegister(req, res, bcrypt, db));

app.get("/profile/:id", (req, res) => profile(req, res, db));
app.put("/image", (req, res) => image(req, res, db));
app.post("/imageurl", (req, res) => imageUrl(req, res));

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`);
});
