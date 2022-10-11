const puppeteer = require("puppeteer");
const fs = require("fs/promises");

async function getData(
  url,
  titleSelector,
  urlsSelector,
  pricesSelector,
  directory
) {
  const collection = [];
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  const titles = await page.$$eval(titleSelector, function (items) {
    return items.map((x) => x.textContent.trim());
  });

  const urls = await page.$$eval(urlsSelector, (items) => {
    return items.map((x) => x.href);
  });

  const prices = await page.$$eval(pricesSelector, (items) => {
    return items.map((x) => x.textContent);
  });

  while (titles.length > 0) {
    collection.push({
      title: titles.shift(),
      url: urls.shift(),
      price: prices.shift(),
    });
  }
  fs.writeFile(directory, JSON.stringify(collection, null, 2), (err) => {
    if (err) throw err.message;
    console.log("created!");
  });
  await browser.close();
}

module.exports = { getData };
