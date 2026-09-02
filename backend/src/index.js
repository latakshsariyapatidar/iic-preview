const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
// Serve static images uploaded to public/uploads
app.use("/uploads", express.static(path.join(__dirname, "../public/uploads")));

// Routes
app.use("/api/admin", require("./routes/admin"));
app.use("/api/events", require("./routes/events"));
app.use("/api/gallery", require("./routes/gallery"));
app.use("/api/team", require("./routes/team"));
app.use("/api/enquiries", require("./routes/enquiries"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
