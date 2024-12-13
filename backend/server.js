const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const bookingRoutes = require("./routes/bookings");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static("uploads"));
app.use('/api',bookingRoutes);

app.use("/api/auth", require("./routes/auth"));
app.use("/api/properties", require("./routes/properties"));
app.use("/api/user", require("./routes/user"));

app.use("/api/listings", require("./routes/listings"));
app.use("/api/bookings", require("./routes/bookings"));




app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
