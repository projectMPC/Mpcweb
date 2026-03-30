const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");// used to hash and compare the passwords

// this handle signup
router.post("/signup",async(req, res) =>{

    const { regNo, password } = req.body; // getting data from request
    const hashedPassword = await bcrypt.hash(password,10); // convert password into secure encrypted form // here 10 for salt rounds(security level)


  try {
    const user = new User({ regNo, password: hashedPassword });
    await user.save();
    res.json({ message: "User created" });
  } catch (err) {
    res.status(400).json({ error: "User already exists" });
  }

})


// login route

// handle login request
router.post("/login", async (req, res) => {
  const { regNo, password } = req.body; // get user input using req.body

  const user = await User.findOne({ regNo }); // find user  like   does it exit
  
  // if user not found
  if (!user) {
    return res.status(400).json({ error: "User not found" });
  }
  
  // if found then compare the passward 
  const isMatch = await bcrypt.compare(password, user.password);

  // if passward not math it through an error
  if (!isMatch) {
    return res.status(400).json({ error: "Invalid password" });
  }
  
  // after completation login
  res.json({ message: "Login successful" });
});

module.exports = router;
