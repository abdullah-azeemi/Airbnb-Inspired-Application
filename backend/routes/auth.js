const express = require("express");
const router = express.Router();

const users = [];

router.post("/signup", (req, res) => {
  const { name, email, password } = req.body;
  if (users.find((user) => user.email === email)) {
    return res.status(400).json({ message: "User already exists." });
  }
  users.push({ name, email, password });
  res.json({ message: "User registered successfully." });
});
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find((user) => user.email === email && user.password === password);
  if (!user) {
    return res.status(400).json({ message: "Invalid credentials." });
  }
  res.json({ message: "Login successful." });
});

module.exports = router;