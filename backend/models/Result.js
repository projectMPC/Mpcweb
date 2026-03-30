const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
  regNo: String,
  name: String,
  branch: String,
  exam: String,
  subjects: [
    {
      code: String,
      grade: String,
      result: String,
    },
  ],
  gpa: Number,
});

module.exports = mongoose.model("Result", resultSchema);