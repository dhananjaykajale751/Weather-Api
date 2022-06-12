const express = require("express");
const https = require("https");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {

    const query = req.body.cityName;
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=1cee3fb1561c3ab4e10dc74685dcb05e&units=metric";

    https.get(url, function(response) {
        console.log(response.statusCode);

        response.on("data", function(data) {
            var weatherData = JSON.parse(data);
            //console.log(weatherData);
            const temperature = weatherData.main.temp;
            const Feels = weatherData.main.feels_like;
            const hum = weatherData.main.humidity;


            const weatherDes = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;

            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png ";
            res.write("<h1>The Tempreature in " + query + " is " + temperature + " Degree Celcius</h1>");
            res.write("<h2> The Weather in  " + query + " is " + weatherDes + "</h2>");
            res.write("<img src=" + imageURL + ">");
            res.write("<h2> Feels Like " + Feels + " Celcius </h2>");
            res.write("<h2>Humidity :- " + hum + " %</h2> ");

            res.send();

        });
    });
});
app.listen(4000, function() {
    console.log("Server is running on port 4000");
});