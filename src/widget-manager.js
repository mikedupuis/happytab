
function getZipcodes() {
    let zipCodes = [];
    options.zipcode.split(',').forEach(function(zipcode) {
        zipCodes.push(zipcode.trim());
    });

    return zipCodes;
}

function buildWidgetsList() {
    let widgetsList = [];

    widgetsList.push(new UpdateNotification(options.acknowledgedVersionNumber));

    if (options.showClock) {
        widgetsList.push(new Clock());
    }

    if (options.showWeather) {
        getZipcodes().forEach(function(zipcode) {
            widgetsList.push(new Weather(zipcode, options.weatherApiKey, options.weatherUnits));
        });
    }

    return widgetsList;
}

let widgetsList = buildWidgetsList()
widgetsList.forEach(function(widget) {
    widget.execute();
});

