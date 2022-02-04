// Environment file
require("dotenv").config();

// Packages / libraries required
import express from "express";
import mongoose from "mongoose";

// File imports
import { UserModel } from "./database/UserSchema";

const app = express();

const cred = [
  {
    id: 1,
    fname: "Kunal",
    email: "rkunal3099@gmail.com",
    pass: "kunal1",
  },
  {
    id: 2,
    fname: "Rahul",
    email: "munjrahul@gmail.com",
    pass: "rahul1",
  },
  {
    id: 3,
    fname: "Bhavesh",
    email: "bkamble2428@gmail.com",
    pass: "bhavesh1",
  },
  {
    id: 4,
    fname: "Gopal",
    email: "gopalpandhare5gmail.com",
    pass: "gopal1",
  },
];

// const db =
//   "mongodb+srv://kunalr-99:Kunal2018@microservices-auth.ztwcy.mongodb.net/auth-api?retryWrites=true&w=majority";
const db = process.env.MONGO_URI;

mongoose
  .connect(db, {})
  .then(() => {
    console.log(`DB is connected man`);
  })
  .catch((err) => {
    console.log(`Db error is here - ${err}`);
  });

app.get("/", (req, res) => {
  res.json({ msg: "Hello there!" });
});

// SignUp
// app.post("/signin", async (req, res) => {
//   try {
//     const { email, pass } = req.body.credentials;
//     const filteredEmail = cred.filter((cred) => cred.email === emailId);
//     // check whethere user exists???
//     if (emailId === filteredEmail.email)
//       return res.status(200).json({ msg: "User already exists" });

//     // Hash and salt entered password
//     cred.push();

//     if (password === filteredEmail.pass)
//       return res.status(200).json({ msg: "Access granted" });
//   } catch (err) {
//     res.status(500).json({ msg: `System error is - ${err}` });
//   }
// });

app.post("/signin", (req, res) => {
  try {
    const { email, pass } = req.body.credentials;

    const findEmail = cred.filter((content) => email === content.email);

    if (findEmail.pass === pass) return res.json({ msg: "Access Granted" });
    return res.json({ msg: "Invalid Password" });
    // return res.status(200).json({ msg: req.body.credentials });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.listen(5000, () => {
  console.log(`Servr is up and running on http://localhost:5000`);
});
