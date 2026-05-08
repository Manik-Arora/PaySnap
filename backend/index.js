const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const app = express();
const port = 3000;
const rootRouter = require("./routes/index");

app.use(express.json());
app.use(cors());

app.use("/api/v1", rootRouter);

app.listen(port, () => {
  console.log(`PaySnap app listening on Port: ${port}`);
});

console.log("Hi");
