const express = require("express")().listen(3000, () =>
  console.log("Server is running")
);
const axios = require("axios");
const cheerio = require("cheerio");

const url =
  "https://www.emag.bg/peleni-gashtichki/filter/razmer-f7988,4-v26555/c?ref=lst_leftbar_7988_26555";
const data = [];

axios(url)
  .then((response) => {
    const html = response.data;
    const $ = cheerio.load(html);
    $(".card-v2-info", html).each(function () {
      const info = $(this)
        .text()
        .split("\n")
        .map((n) => n.trim())
        .filter((n) => n != "");
      const url = $(this).find("a").attr("href");
      const img = $(this).find("img").attr("src");
      const brand = info[0];
      const priceForOne = info[3];
      data.push({
        brand,
        priceForOne,
        url,
        img,
      });
    });
    console.log(data);
  })
  .catch((err) => console.log(err.message));
