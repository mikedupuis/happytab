const SHOW_NFL_OPTION_RETIRED = {
    storageKey: 'showNFL',
}

const NFL_TEAM_OPTION_RETIRED = {
    storageKey: 'nflTeam',
}

const SHOW_QUOTE_OPTION_RETIRED = {
    storageKey: 'showQuote',
}

const RETIRED_OPTIONS = [
    SHOW_NFL_OPTION_RETIRED,
    NFL_TEAM_OPTION_RETIRED,
    SHOW_QUOTE_OPTION_RETIRED
]

const SHOW_SIDEBAR_OPTION = {
    display: true,
    elementId: 'switch-sidebar',
    defaultValue: true,
    storageKey: 'showSidebar',
    loader: loadOrDefaultBoolean,
    mutator: switchSidebarChanged,
    property: 'checked',
    childStateInitializer: null
}

const SHOW_CLOCK_OPTION = {
    display: true,
    elementId: 'switch-clock',
    defaultValue: false,
    storageKey: 'showClock',
    loader: loadOrDefaultBoolean,
    mutator: switchClockChanged,
    property: 'checked',
    childStateInitializer: null
}

const SHOW_WEATHER_OPTION = {
    display: true,
    elementId: 'switch-weather',
    defaultValue: true,
    storageKey: 'showWeather',
    loader: loadOrDefaultBoolean,
    mutator: switchWeatherChanged,
    property: 'checked',
    childStateInitializer: setWeatherChildInputsVisibility
}

const WEATHER_API_KEY_OPTION = {
    display: true,
    elementId: 'text-weather-api-key',
    defaultValue: '',
    storageKey: 'weatherApiKey',
    loader: loadOrDefault,
    mutator: weatherApiKeyChanged,
    property: 'value',
    childStateInitializer: null
}

const ZIPCODE_OPTION = {
    display: true,
    elementId: 'text-zipcode',
    defaultValue: 55421,
    storageKey: 'zipcode',
    loader: loadOrDefault,
    mutator: zipcodeChanged,
    property: 'value',
    childStateInitializer: null
}

const UNITS_OPTION = {
    display: true,
    elementId: 'weather-units',
    defaultValue: 'imperial',
    storageKey: 'weatherUnits',
    loader: loadOrDefault,
    mutator: weatherUnitsChanged,
    property: 'value',
    childStateInitializer: null
}

const BACKGROUND_ROTATION_PERIOD_OPTION = {
    display: true,
    elementId: 'background-rotation-period',
    defaultValue: 86400,
    storageKey: 'backgroundRotationPeriod',
    loader: loadOrDefault,
    mutator: backgroundRotationPeriodChanged,
    property: 'value',
    childStateInitializer: null
}

const ACKNOWLEDGED_VERSION_NUMBER_OPTION = {
    display: false,
    defaultValue: 0,
    storageKey: 'acknowledgedVersionNumber',
    loader: loadOrDefault,
}

const OPTIONS = [
    SHOW_SIDEBAR_OPTION,
    SHOW_CLOCK_OPTION,
    SHOW_WEATHER_OPTION,
    ZIPCODE_OPTION,
    WEATHER_API_KEY_OPTION,
    UNITS_OPTION,
	BACKGROUND_ROTATION_PERIOD_OPTION,
    ACKNOWLEDGED_VERSION_NUMBER_OPTION
]

function loadOrDefault(option) {
    let result = localStorage.getItem(option.storageKey);

    if (result) {
        return result
    }

    localStorage.setItem(option.storageKey, option.defaultValue)
    return option.defaultValue
}

function loadOrDefaultBoolean(option) {
    return loadOrDefault(option) === 'true'
}

function switchSidebarChanged(inputEvent) {
    localStorage.setItem(SHOW_SIDEBAR_OPTION.storageKey, inputEvent.target.checked)
}

function switchClockChanged(inputEvent) {
    localStorage.setItem(SHOW_CLOCK_OPTION.storageKey, inputEvent.target.checked)
}

function setWeatherChildInputsVisibility() {
    let value = localStorage.getItem(SHOW_WEATHER_OPTION.storageKey) === 'true' ? '': 'none'
    document.getElementById('show-weather-api-key-tooltip').style.display = value;
    document.getElementById('show-weather-zip-tooltip').style.display = value;
    document.getElementById('weather-units-div').style.display = value;
}

async function switchWeatherChanged(inputEvent) {
    await localStorage.setItem(SHOW_WEATHER_OPTION.storageKey, inputEvent.target.checked);
    setWeatherChildInputsVisibility()
}

function zipcodeChanged(inputEvent) {
    localStorage.setItem(ZIPCODE_OPTION.storageKey, inputEvent.target.value)
}

function weatherApiKeyChanged(inputEvent) {
    localStorage.setItem(WEATHER_API_KEY_OPTION.storageKey, inputEvent.target.value)
}

function weatherUnitsChanged(inputEvent) {
    localStorage.setItem(UNITS_OPTION.storageKey, inputEvent.target.value)
}

function backgroundRotationPeriodChanged(inputEvent) {
	localStorage.setItem(BACKGROUND_ROTATION_PERIOD_OPTION.storageKey, inputEvent.target.value)

    // Expire the existing background immediately 
    localStorage.setItem('backgroundExpirationTimestamp', 0)
}

function updateAcknowledgedOptionsNumber(newAcknowledgedOptionsNumber) {
    localStorage.setItem(ACKNOWLEDGED_VERSION_NUMBER_OPTION.storageKey, newAcknowledgedOptionsNumber)
}

function loadOptionsData() {
    let data = {
        showWeather: false,
        showClock: false,
        zipcode: 55421,
        weatherApiKey: '',
        weatherUnits: 'imperial',
        showSidebar: true,
        acknowledgedVersionNumber: undefined
    }
    OPTIONS.forEach(function(option) {
        data[option.storageKey] = option.loader(option)
    })

    return data
}

function deleteRetiredOptions() {
    RETIRED_OPTIONS.forEach(function(option) {
        if (!localStorage.getItem(option.storageKey)) {
            return;
        }

        console.log("Deleting retired localStorage option " + option.storageKey)
        localStorage.removeItem(option.storageKey)
    })
}

function prepareOptionsUI() {
    OPTIONS.forEach(function(option) {
        if (!option.display) {
            return
        }

        let value = option.loader(option)
        let element = document.getElementById(option.elementId)
        element[option.property] = value
        element.onchange = option.mutator

        if (option.childStateInitializer !== null) {
            option.childStateInitializer()
        }
    })
}

