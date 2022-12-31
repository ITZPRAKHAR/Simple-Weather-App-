const { application } = require('express');
const express = require('express');
const app = express();
const port = 3000;
const https = require("https");



const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", function (req, res) {

    res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
    console.log(req.body.cityname);

    const city = req.body.cityname;

    const appid = "bca4890d4a367e4cf18a756012373d53"

    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + appid + "&units=metric";
    console.log(url);
    https.get(url, function (response) {
        response.on("data", function (data) {
            const weatherdata = JSON.parse(data);


            res.write("<h1>Temperatue of " + weatherdata.name + " is " + weatherdata.main.temp + " degree celcius</h1>");

            res.write("The current weather is " + weatherdata.weather[0].description);

            const icon = weatherdata.weather[0].icon;
            const imgURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

            res.write("<img src=" + imgURL + ">");
            res.send();

        })
    })


});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

