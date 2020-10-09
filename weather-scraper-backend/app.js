const express = require("express");
const app = express();
const puppeteer = require("puppeteer");
const $ = require("cheerio");

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Requested-With"
  );
  next();
});

app.get("/get-city-data/:countryName/:cityName", async (req, res) => {
  let data = {};

  data.city = req.params.cityName;
  data.country = req.params.countryName;

  let CITY = req.params.cityName.replace(" ", "-");
  let COUNTRY = req.params.countryName;
  const url = `https://www.timeanddate.com/weather/${COUNTRY}/${CITY}/ext`;
  const test = $('#h2').test();
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  const pageHtml = await page.content();

  //wind:
  let wholeString = $("#qlook > p:nth-child(6)", pageHtml).text();
   console.log (wholeString);
  let afterWind = wholeString.split("Wind: ")[1];

  data.afterWind = afterWind;

  data.wind = afterWind.split(" km/h")[0];

  data.temperature = $($(".h2", pageHtml)[0]).text();
  data.sky = $("#qlook > p:nth-child(4)", pageHtml).text();
  data.icon = $($(".mtt", pageHtml)[0]).attr("src");

  // humidity
  data.humidity = $(".table > tbody > tr:nth-child(6) > td", pageHtml).text();

   console.log(data);

  await browser.close();

  res.send(data);
});

app.listen(4000, () => console.log("listening on 4000"));
