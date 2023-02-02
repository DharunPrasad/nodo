const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const {getTodo, createTodo, updateGetTodo, updateTodo, deleteTodo} = require("./controllers/todoController")

//To access .env file
dotenv.config();

//To serve static files like ejs
app.use("/static", express.static("public"));

//Access view engine
app.set("view engine", "ejs");


app.use(express.urlencoded({ extended: true }));

app.get("/",getTodo);

app.post("/", createTodo);

app
  .route("/edit/:id")
  .get(updateGetTodo)
  .post(updateTodo);

app.route("/remove/:id").get(deleteTodo);

//connection to db
mongoose.set('strictQuery', true);
mongoose.connect(process.env.DB_CONNECT).then(() => {
  app.listen($PORT, "0.0.0.0" ,() => console.log("Server Up and running"));
});
