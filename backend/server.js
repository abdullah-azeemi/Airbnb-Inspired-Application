const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const listingsRoutes = require("./routes/listings"); 
app.use("/api/listings", listingsRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
