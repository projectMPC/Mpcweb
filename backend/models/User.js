const mongoose = require("mongoose"); // importing Mongoose Libraary ( used to define struture and intract with MongoDb)

// creating Schemea

const userSchema = new mongoose.Schema({
  // Schema is a blueprint of our data like how our data should look in database

  // defining fields
  regNo: { type: String, required: true, unique: true }, // type: String → data type is string // required: true → must be provided (cannot be empty)// // unique: true → no duplicate values allowed
  password: { type: String, required: true }, // type: String → stored as string // required: true → mandatory field
});

module.exports = mongoose.model("User", userSchema); // ye export karega and hame show karega mongo db main  and here user is the collection of data
