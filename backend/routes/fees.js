const express = require("express");
const router = express.Router();
const Fee = require("../models/Fee");

router.get("/:regNo", async (req, res) => {
  try {
    const fees = await Fee.find({ regNo: req.params.regNo });

    res.json(fees);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

router.put("/pay/:id", async (req, res) => {
  try {
    const fee = await Fee.findByIdAndUpdate(
      req.params.id,
      {
        status: "Paid",
        paidDate: new Date(),
      },
      { new: true }
    );

    res.json(fee);
  } catch (err) {
    res.status(500).json({ error: "Payment failed" });
  }
});

module.exports = router;