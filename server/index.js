const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const route = require("./routes/studentRoute.js");
const cors = require("cors");
const bodyParser = require("body-parser");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use(bodyParser.json());

const PORT = process.env.PORT || 7000;
const MONGODBURL = process.env.MONGODB_URL;

console.log(`Server is currently running on port ${PORT}`);

mongoose.connect(MONGODBURL)
.then(() => {
  console.log("DB connected successfully.")
  app.listen(PORT, ()=>{
    console.log(`Server is running on port : ${PORT} `)
  });
})
.catch((error) => console.log(error));

// mongoose.connect(MONGODBURL)
//   .then(() => {
//     console.log("DB connected successfully.");
//     app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
//     console.log('results', MONGODBURL);
//   })
//   .catch((error) => console.log(error));

app.use("/api", route);