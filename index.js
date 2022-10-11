const express = require("express");
const { getData } = require("./utils");
const { emag } = require("./details/emag");
const { dzone } = require("./details/dzon");
const { galen } = require("./details/galen");

const app = express();

const webPages = [emag, dzone, galen];

for (let pages of webPages) {
  getData(
    pages.url,
    pages.titleSelector,
    pages.urlsSelector,
    pages.pricesSelector,
    pages.directory
  );
}

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(3000, () => {
  console.log("Server is running");
});
