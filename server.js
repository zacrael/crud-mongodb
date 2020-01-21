const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const config = require("config");
const app = express();
//bodyparser middleware
app.use(express.json());
// dbconfig
const db = config.get("mongoURI");
// connect to mongo
// mongoose.connect('mongodb://127.0.0.1:27017/todos', { useNewUrlParser: true });
//const mongoose = require("mongoose");
//
// mongoose
//   .connect("mongodb://127.0.0.1:27017/todos", {
//     useNewUrlParser: true,
//     useCreateIndex: true
//   })
//
mongoose
  .connect("mongodb://127.0.0.1:27017/todos", {
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => console.log("mongoDB Connected...."))
  .catch(err => console.log(err));
// use routes
app.use("/api/items", require("./routes/api/items"));
app.use("/api/users", require("./routes/api/Users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/upload", express.static("uploads"));
if (process.env.NODE_ENV === "production") {
  // app.use(express.static("homepage/build"));
  //app.get("*", (req, res) => {
  //res.sendFile(path.resolve(__dirname, "homepage", "build", "index.html"));
  // });
}
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
