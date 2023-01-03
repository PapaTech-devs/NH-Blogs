const express = require("express");
const Article = require("./../models/article");
const heroBlog = require("./../models/hero");
const router = express.Router();

router.get("/new", (req, res) => {
  res.render("articles/new", { article: new Article() });
});

router.get("/edit/:id", async (req, res) => {
  const article = await Article.findById(req.params.id);
  res.render("articles/edit", { article: article });
});

router.put("/setHero/:id", async (req, res) => {
  console.log("hero api called", req.params.id);
  try {
    let hero = await heroBlog.findOne({ heroId: "heroId1" });
    if (!hero) {
      hero = new heroBlog();
      // hero.save();
    }
    console.log("hero", hero);
    const updatedHero = await hero.updateOne({ heroBlogId: req.params.id });
  } catch (e) {
    console.log("error", e);
    // res.render("articles/error");
  }
});

router.get("/:slug", async (req, res) => {
  const article = await Article.findOne({ slug: req.params.slug });
  if (article == null) res.redirect("/");
  res.render("articles/show", { article: article });
});

router.post(
  "/",
  async (req, res, next) => {
    req.article = new Article();
    next();
  },
  saveArticleAndRedirect("new")
);

router.put(
  "/:id",
  async (req, res, next) => {
    req.article = await Article.findById(req.params.id);
    next();
  },
  saveArticleAndRedirect("edit")
);

// router.delete("/:id", async (req, res) => {
//   await Article.findByIdAndDelete(req.params.id);
//   res.redirect("/");
// });

function saveArticleAndRedirect(path) {
  return async (req, res) => {
    let article = req.article;
    article.title = req.body.title;
    article.description = req.body.description;
    article.markdown = req.body.markdown;
    article.thumbnail = req.body.thumbnail;
    article.featured = req.body.featured == "true" ? true : false;
    console.log(article.featured);
    try {
      article = await article.save();
      res.redirect(`/articles/${article.slug}`);
    } catch (e) {
      res.render(`articles/${path}`, { article: article });
    }
  };
}

module.exports = router;
