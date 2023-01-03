const mongoose = require("mongoose");

const heroBlog = new mongoose.Schema({
  heroId: { type: String, default: "heroId1" },
  heroBlogId: {
    type: String,
  },
});

module.exports = mongoose.model("HeroBlog", heroBlog);
