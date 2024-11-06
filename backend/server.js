const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use("/images", express.static("images"));

const listingsRoutes = require("./routes/listings");
app.use("/api/listings", listingsRoutes);

const authRoutes = require("./routes/auth");
app.use("/api", authRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
