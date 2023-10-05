const express = require("express");
const jwt = require("jsonwebtoken");
const { Course, Admin } = require("../database/db");
const { SECRET_A } = require("../middleware/auth_admin");
const { authenticateJwtAdmin } = require("../middleware/auth_admin");

const router = express.Router();

router.get("/me", authenticateJwtAdmin, (req, res) => {
  res.json({
    username: req.user.username,
  });
});

router.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  const admin = await Admin.findOne({ username });
  if (admin) {
    res.status(403).json({ message: "Admin already exists" });
  } else {
    const obj = { username: username, password: password };
    const newAdmin = new Admin(obj);
    await newAdmin.save();
    const token = jwt.sign({ username, role: "admin" }, SECRET_A, {
      expiresIn: "2h",
    });
    res.json({ message: "Admin created successfully", token });
  }
});

router.post("/signin", async (req, res) => {
  const { username, password } = req.headers;
  const admin = await Admin.findOne({ username, password });
  if (admin) {
    const token = jwt.sign({ username, role: "admin" }, SECRET_A, {
      expiresIn: "2h",
    });
    res.json({ message: "Logged in successfully", token });
  } else res.status(403).json({ message: "Invalid username or password" });
});

router.post("/courses", authenticateJwtAdmin, async (req, res) => {
  const course = new Course(req.body);
  await course.save();
  res.json({ message: "Course created successfully", courseId: course.id });
});

router.put("/courses/:courseId", authenticateJwtAdmin, async (req, res) => {
  const course = await Course.findByIdAndUpdate(req.params.courseId, req.body, {
    new: true,
  });
  if (course) {
    res.json({ message: "Course updated successfully" });
  } else {
    res.status(404).json({ message: "Course not found" });
  }
});

router.get("/courses", authenticateJwtAdmin, async (req, res) => {
  const courses = await Course.find({});
  res.json({ courses });
});

router.get("/course/:courseId", authenticateJwtAdmin, async (req, res) => {
  const courseId = req.params.courseId;
  const course = await Course.findById(courseId);
  res.json({ course });
});

module.exports = router;
