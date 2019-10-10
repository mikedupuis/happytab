var IMPERIAL = "imperial"
var METRIC = "metric"
var KELVIN = "kelvin"

var zipCode = options.zipcode
var apiKey = options.weatherApiKey
var units = options.weatherUnits

console.log("units", units)

function setTemp(data) {
    var suffix = ""
    if (units == IMPERIAL) {
        suffix = ' \xB0F';
    } else if (units == METRIC) {
        suffix = ' \xB0C';
    } else if (units == KELVIN) {
        suffix = ' K';
    }

    document.getElementById("weather-temp").textContent = Math.round(data.main.temp) + suffix;
}

function setLocation(data) {
    document.getElementById("weather-location").textContent = data.name + ", " + data.sys.country;
}

function setImage(data) {
    document.getElementById("weather-img").src = "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";
}

function fetchWeather() {
    const request = new XMLHttpRequest();
    request.timeout = 2000;
    request.onreadystatechange = function(e) {
        if (request.readyState === 4) {
            if (request.status === 200) {
                var data = JSON.parse(this.response);

                setTemp(data)
                setLocation(data)
                setImage(data)
            } else {
                // TODO: Handle errors
            }
        }
    }
    request.ontimeout = function () {
        // TODO: Handle errors
    }

    request.open('GET', 'https://api.openweathermap.org/data/2.5/weather?zip=' + zipCode + ',us&units=' + units + '&appid&appid=' + apiKey, true)
    request.send();
}

if (options.showWeather) {
    fetchWeather();
}

