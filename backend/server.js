
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const axios = require('axios');
const cheerio = require('cheerio');

require('dotenv').config();

const app = express();
const port = process.env.PORT;

const getHtml = async () => {
  try {
    return await axios.get('https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=0&ie=utf8&query=%EC%98%A4%EB%8A%98+%EB%82%A0%EC%94%A8');
  } catch (error) {
    console.error(error);
  }
};

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true}
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);
app.get('/current', async (req, res) => {
  getHtml()
  .then((html) => {
    const $ = cheerio.load(html.data);
    const data = {
      curTemp : $('#main_pack > section.sc_new.cs_weather_new._cs_weather > div._tab_flicking > div.content_wrap > div.open > div:nth-child(1) > div > div.weather_info > div > div._today > div.weather_graphic > div.temperature_text > strong').text(),
      tempLimits: $('#main_pack > section.sc_new.cs_weather_new._cs_weather > div._tab_flicking > div.content_wrap > div.content_area > div.inner > div > div.list_box._weekly_weather > ul > li:nth-child(1) > div > div.cell_temperature > span > span.lowest').text()
      + " " + $('#main_pack > section.sc_new.cs_weather_new._cs_weather > div._tab_flicking > div.content_wrap > div.content_area > div.inner > div > div.list_box._weekly_weather > ul > li:nth-child(1) > div > div.cell_temperature > span > span.highest').text(),
    };
    return data;
  })
  .then((data) => res.send(data));
})

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});