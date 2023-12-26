const express = require("express");
require("./db/mongo");

const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

const app = new express();
const port = process.env.PORT;

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);
// app.use(bodyParser.urlencoded({ extended: false }));

app.get("", (req, res) => {
  res.send("<h1> hi <h1>");
});

app.listen(port, () => {
  console.log("app is running on " + port);
});
