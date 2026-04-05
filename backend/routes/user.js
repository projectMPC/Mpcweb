const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get("/:regNo", async (req, res) => {
  try {
    const user = await User.findOne({ regNo: req.params.regNo });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;