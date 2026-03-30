const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
  regNo: String,   // link with user
  branch: String,
  year: String,
  subjects: [
    {
      name: String,
      code: String,
    }
  ]
});

module.exports = mongoose.model("Subject", subjectSchema);