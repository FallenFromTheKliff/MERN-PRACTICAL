const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Student = require("./models/Student");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("MongoDB connection error:", error);
  });

app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.get("/students", async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

app.post("/students", async (req, res) => {
  const student = await Student.create(req.body)
  res.json(student);
});

app.put("/students/:id", async (req, res) => {
  const updater = await Student.findByIdAndUpdate(req.params._id, req.body);
  res.json(updater);
});

app.delete("/students/:id", async (req, res) => {
  const deleter = await Student.findByIdAndDelete(req.params._id);
  res.json(deleter);
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});