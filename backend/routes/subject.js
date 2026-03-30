const express = require("express");
const router = express.Router();
const Subject = require("../models/Subject");

// ✅ Get subjects by regNo
router.get("/:regNo", async (req, res) => {
  try {
    const data = await Subject.findOne({ regNo: req.params.regNo });

    if (!data) {
      return res.status(404).json({ error: "Subjects not found" });
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;