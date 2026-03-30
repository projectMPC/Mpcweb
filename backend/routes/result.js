const express = require("express");
const router = express.Router();
const Result = require("../models/Result");

router.get("/:regNo", async (req, res) => {
  try {
    const result = await Result.find({ regNo: req.params.regNo })

    if (!result) {
      return res.status(404).json({ error: "Result not found" });
    }

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;