const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = 'Deepakis$doingG$reat';

// ROUTE 1: Create a User using: POST "/api/auth/createuser". Doesn't require Authentication
router.post("/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be atleast 5 characters").isLength({min: 5,}),
  ],
  async (req, res) => {
    let success = false;
    // If there are errors return Bad req and errors....
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }
    // check whether the user with the same email exist or not !!!
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {return res.status(400).json({success, errors: "User with this email already exists" });
      }

      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      // creating new user
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      }); 

      const data = {
        user:{
          id: user.id,
        }
      }

      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({success, authtoken});
      
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

// ROUTE 2: Authenticate a user using: POST "/api/auth/login". No need to login..
router.post("/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password should not be empty").exists(),
  ], async (req, res) => {
    let success = false;
    // If there are errors return Bad req and errors....
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //  comapare previous password with the password input by the user.
    const {email,password } = req.body;
    try {
      let user  = await User.findOne({ email})
      if(!user) {
        success = false;
        return res.status(400).json({success, errors:"Try to login with correct credentials"});
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if(!passwordCompare) {
        success = false;
        return res.status(400).json({success, errors:"Try to login with correct credentials"});
      }
      const data = {
        user:{
          id: user.id,
        }
      }
      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({success, authtoken});

    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  })

  // ROUTE 3: Get logged in User Details using: POST "/api/auth/getuser". Login Required..
  router.post("/getuser", fetchuser, async (req, res) => {

    try {
      userId = req.user.id;
      const user = await User.findById(userId).select("-password");
      res.send(user);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  })
module.exports = router;
