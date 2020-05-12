module.exports = {
  publicPath:
    process.env.NODE_ENV === "production" ? "/flex_emojibuilder/" : "/",

  outputDir: process.env.NODE_ENV === "production" ? "docs" : "dist",
};
