const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
const cors = require("cors");
const connectDB = require("../db");
const userRoutes = require("../routes/UserRoutes");

connectDB();

app.use(express.json());
app.use(cors());
app.use("/api/user", userRoutes);

app.listen(port, () => {
  console.log(`App listening at ${port}`);
});
