// Environment file
require("dotenv").config();

// Packages / libraries required
import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// File imports
import { UserModel } from "./database/UserSchema";

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Connection db
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

// Sign up route
app.post("/signup", async (req, res) => {
  try {
    const { fname, email, pass } = req.body.credentials;
    const doesEmailExist = await UserModel.findOne({ email });
    if (!doesEmailExist) {
      const salting = await bcrypt.genSalt(8);
      const hashedPass = await bcrypt.hash(pass, salting);
      const newRegistration = await UserModel.create({
        ...req.body.credentials,
        pass: hashedPass,
      });
      const token = jwt.sign({ user: newRegistration._id }, "auth");
      return res.status(200).json({
        token,
        status: "Successfully retrieved your token and added new user",
      });
    } else {
      return res.status(200).json({ msg: "Email already exists" });
    }
  } catch (err) {
    return res.status(500).json({ msg: err });
  }
});

// Sign in route
app.post("/signin", async (req, res) => {
  try {
    const { email, pass } = req.body.credentials;

    const findEmail = await UserModel.findOne({ email });

    if (!findEmail)
      return res
        .status(200)
        .json({ msg: "User does not exist. Please Sign up!!" });

    const checkPassword = await bcrypt.compare(pass, findEmail.pass);
    if (checkPassword) {
      return res.status(200).json({ msg: "Access Granted" });
    } else {
      return res.status(200).json({ msg: "Invalid Password" });
    }
  } catch (err) {
    return res.status(500).json({ msg: err });
  }
});

// Listen to port
app.listen(5000, () => {
  console.log(`Server is up and running on http://localhost:5000`);
});

//LOCAL DATABASE -----------------
// const cred = [
//   {
//     fname: "Kunal",
//     email: "rkunal3099@gmail.com",
//     pass: "kunal1",
//   },
//   {
//     fname: "Rahul",
//     email: "munjrahul@gmail.com",
//     pass: "rahul1",
//   },
//   {
//     fname: "Bhavesh",
//     email: "bkamble2428@gmail.com",
//     pass: "bhavesh1",
//   },
//   {
//     fname: "Gopal",
//     email: "gopalpandhare5gmail.com",
//     pass: "gopal1",
//   },
// ];

//SIGN UP ------------------------
// app.post("/signup", (req, res) => {
//   try {
//     const { fname, email, pass } = req.body.credentials;
//     const doesEmailExist = cred.filter((content) => email === content.email);
//     // console.log(doesEmailExist);
//     // return res.status(200).json({ msg: "Hi" });
//     if (doesEmailExist.length === 0) {
//       cred.push({
//         id: 5,
//         fname,
//         email,
//         pass,
//       });
//       return res.status(200).json({ msg: "New user added" });
//     } else {
//       return res.status(200).json({ msg: "Email already exists" });
//     }
//   } catch (err) {
//     return res.status(500).json({ msg: err });
//   }
// });

//SIGN IN ------------------------
// app.post("/signin", (req, res) => {
//   try {
//     const { email, pass } = req.body.credentials;

//     const findEmail = cred.filter((content) => email === content.email);
//     // console.log(findEmail);

//     // const data = {
//     //   email: "",
//     //   pass: "",
//     // };

//     // for (let i of cred) {
//     //   if (findEmail === cred[i]) {
//     //     data = {
//     //       ...findEmail,
//     //     };
//     //   }
//     // }

//     // console.log(data);

//     if (pass === findEmail[0].pass) {
//       return res.json({ msg: "Access Granted" });
//     } else {
//       return res.json({ msg: "Invalid Password" });
//     }
//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
// });
