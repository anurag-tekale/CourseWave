const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const adminRouter = require("./routes/admin");
const userRouter = require("./routes/user");

app.use(cors());
app.use(express.json());
app.use("/admin", adminRouter);
app.use("/users", userRouter);

// connect to MongoDB
mongoose.connect(
  "mongodb+srv://AnuragTekale:course_wave_fullstackproject@coursewave.891zosx.mongodb.net/",
  { useNewUrlParser: true, useUnifiedTopology: true, dbName: "courses" }
);

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
