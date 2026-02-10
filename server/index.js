const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const route = require("./routes/studentRoute.js");
const cors = require("cors");

require("dotenv").config();

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);
app.use(express.json());

const PORT = process.env.PORT || 7000;
const MONGODBURL = process.env.MONGODB_URL;

if (!MONGODBURL || typeof MONGODBURL !== "string") {
  console.error(
    "Missing MONGODB_URL environment variable. " +
      "Create server/.env with e.g. MONGODB_URL=mongodb://127.0.0.1:27017/student_management",
  );
  process.exit(1);
}

mongoose
  .connect(MONGODBURL)
  .then(() => {
    console.log("DB connected successfully.");
    app.listen(PORT, () => {
      console.log(`Server is running on port : ${PORT} `);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
  });

app.use("/api", route);
