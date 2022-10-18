const express = require("express");
const mongoose = require("mongoose");
const Article = require("../models/article");
const articleRouter = require("../routes/articles");
const methodOverride = require("method-override");
const app = express();

const PORT = 5000 || process.env.PORT;

mongoose.connect(
  "mongodb+srv://nearhouseblogs:tirtha2000@cluster0.dfz9nj5.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  }
);

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

app.get("/", async (req, res) => {
  const articles = await Article.find().sort({ createdAt: "desc" });
  res.render("articles/index", { articles: articles });
});

app.use("/articles", articleRouter);

app.listen(PORT, console.log("server running"));
