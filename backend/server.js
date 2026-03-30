require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const feeRoutes = require("./routes/fees");
const authRoutes = require("./routes/auth");
const resultRoutes = require("./routes/result");
const subjectRoutes = require("./routes/subject");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", authRoutes);
app.use("/api/fees", feeRoutes);
app.use("/api/result", resultRoutes);
app.use("/api/subjects", subjectRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// DB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDb Connected"))
  .catch(err => console.log(err));

// Server start
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});