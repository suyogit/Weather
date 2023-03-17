const express = require("express");
const https = require("node:https");
const bodyParser = require("body-parser");
require("dotenv").config();
//console.log(process.env)
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});
app.post("/", function (req, res) {
  console.log(req.body.cityName);
  //console.log("Post request received");

  const query = req.body.cityName;
  const apikey = process.env.API_Key;
  //  const unit = " metric"
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&appid=" +
    apikey +
    "&units=metric";

  https.get(url, function (response) {
    console.log(response.statusCode);
    response.on("data", function (data) {
      //console.log(data);
      const weatherdata = JSON.parse(data); //converts hexadecimal string into json format
      //console.log(weatherdata);

      const temp = weatherdata.main.temp;
      console.log(temp);
      const des = weatherdata.weather[0].description;
      console.log(des);
      const icon = weatherdata.weather[0].icon;
      //console.log(icon)
      const url = "https://openweathermap.org/img/wn/" + icon + "@2x.png";

      res.write(
        "<h1>The temperatur of" +
          query +
          " is " +
          temp +
          " degree celcius. </h1>"
      );
      res.write("And the weather is " + des);
      res.write("<img src =" + url + ">");
      res.send();
      //
      //   const object=
      //   {
      //     name: "Suyog",
      //     color: "Red"
      //   }
      //   console.log(JSON.stringify(object));
    });
  });
});

/*



*/

app.listen(3000, function () {
  console.log("Server is running on port 3000");
});
