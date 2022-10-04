class Weather {
    static IMPERIAL = "imperial"
    static METRIC = "metric"
    static KELVIN = "kelvin"

    constructor(zipCode, apiKey, units) {
        this.zipCode = zipCode;
        this.apiKey = apiKey;
        this.units = units;
    }

    execute() {
        this.insertWeatherElement();
        this.fetchWeather();
    }

    setTemp(data) {
        var suffix = ""
        if (this.units === Weather.IMPERIAL) {
            suffix = ' \xB0F';
        } else if (this.units === Weather.METRIC) {
            suffix = ' \xB0C';
        } else if (this.units === Weather.KELVIN) {
            suffix = ' K';
        }

        this.tempElement.textContent = Math.round(data.main.temp) + suffix;
    }

    setLocation(data) {
        this.locationElement.textContent = data.name + ", " + data.sys.country;
    }

    setImage(data) {
        this.imageElement.src = "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";
    }

    fetchWeather() {
        const request = new XMLHttpRequest();
        request.timeout = 2000;
        request.onreadystatechange = function(e) {
            if (request.readyState === 4) {
                if (request.status === 200) {
                    this.response = request.response
                    var data = JSON.parse(this.response);

                    this.setTemp(data)
                    this.setLocation(data)
                    this.setImage(data)
                } else {
                    // TODO: Handle errors
                }
            }
        }.bind(this)
        request.ontimeout = function () {
            // TODO: Handle errors
        }

        request.open('GET', 'https://api.openweathermap.org/data/2.5/weather?zip=' + this.zipCode + ',us&units=' + this.units + '&appid&appid=' + this.apiKey, true)
        request.send();
    }

    insertWeatherElement() {
        let sideNavElement = document.getElementById('sidenav');
        let weather = createElementWithId('div', 'weather');

        sideNavElement.appendChild(weather);

        this.tempElement = createElementWithId('p', 'weather-temp');
        weather.appendChild(this.tempElement);

        this.imageElement = createElementWithId('img', 'weather-img');
        weather.appendChild(this.imageElement);

        this.locationElement = createElementWithId('p', 'weather-location');
        weather.appendChild(this.locationElement);
    }
}
