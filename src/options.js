const SHOW_SIDEBAR_OPTION = {
    elementId: 'switch-sidebar',
    defaultValue: true,
    storageKey: 'showSidebar',
    loader: loadOrDefaultBoolean,
    mutator: switchSidebarChanged,
    property: 'checked'
}

const SHOW_CLOCK_OPTION = {
    elementId: 'switch-clock',
    defaultValue: false,
    storageKey: 'showClock',
    loader: loadOrDefaultBoolean,
    mutator: switchClockChanged,
    property: 'checked'
}

const SHOW_QUOTE_OPTION = {
    elementId: 'switch-quote',
    defaultValue: true,
    storageKey: 'showQuote',
    loader: loadOrDefaultBoolean,
    mutator: switchQuoteChanged,
    property: 'checked'
}

const SHOW_BIRTHDAYS_OPTION = {
    elementId: 'switch-birthdays',
    defaultValue: true,
    storageKey: 'showBirthdays',
    loader: loadOrDefaultBoolean,
    mutator: switchBirthdayChanged,
const SHOW_NFL_OPTION = {
    elementId: 'switch-nfl',
    defaultValue: true,
    storageKey: 'showNFL',
    loader: loadOrDefaultBoolean,
    mutator: switchNFLChanged,
    property: 'checked'
}

const SHOW_WEATHER_OPTION = {
    elementId: 'switch-weather',
    defaultValue: true,
    storageKey: 'showWeather',
    loader: loadOrDefaultBoolean,
    mutator: switchWeatherChanged,
    property: 'checked'
}

const WEATHER_API_KEY_OPTION = {
    elementId: 'text-weather-api-key',
    defaultValue: '',
    storageKey: 'weatherApiKey',
    loader: loadOrDefault,
    mutator: weatherApiKeyChanged,
    property: 'value'
}

const NFL_TEAM_OPTION = {
    elementId: 'nfl-team',
    defaultValue: 'sea',
    storageKey: 'nflTeam',
    loader: loadOrDefault,
    mutator: nflTeamChanged,
    property: 'value'
}

const ZIPCODE_OPTION = {
    elementId: 'text-zipcode',
    defaultValue: 55421,
    storageKey: 'zipcode',
    loader: loadOrDefault,
    mutator: zipcodeChanged,
    property: 'value'
}

const UNITS_OPTION = {
    elementId: 'weather-units',
    defaultValue: 'imperial',
    storageKey: 'weatherUnits',
    loader: loadOrDefault,
    mutator: weatherUnitsChanged,
    property: 'value'
}


const OPTIONS = [
    SHOW_SIDEBAR_OPTION,
    SHOW_CLOCK_OPTION,
    SHOW_QUOTE_OPTION,
    SHOW_BIRTHDAYS_OPTION,
    SHOW_NFL_OPTION,
    SHOW_WEATHER_OPTION,
    ZIPCODE_OPTION,
    WEATHER_API_KEY_OPTION,
    NFL_TEAM_OPTION,
    UNITS_OPTION
]

function loadOrDefault(option) {
    var result = localStorage.getItem(option.storageKey)

    if (result) {
        return result
    }

    localStorage.setItem(option.storageKey, option.defaultValue)
    return option.defaultValue
}

function loadOrDefaultBoolean(option) {
    return loadOrDefault(option) == 'true' ? true : false
}

function switchSidebarChanged(inputEvent) {
    localStorage.setItem(SHOW_SIDEBAR_OPTION.storageKey, inputEvent.target.checked)
}

function switchClockChanged(inputEvent) {
    localStorage.setItem(SHOW_CLOCK_OPTION.storageKey, inputEvent.target.checked)
}

function switchQuoteChanged(inputEvent) {
    localStorage.setItem(SHOW_QUOTE_OPTION.storageKey, inputEvent.target.checked)
}

function switchBirthdayChanged(inputEvent) {
    localStorage.setItem(SHOW_BIRTHDAYS_OPTION.storageKey, inputEvent.target.checked)
}

function switchNFLChanged(inputEvent) {
    localStorage.setItem(SHOW_NFL_OPTION.storageKey, inputEvent.target.checked)
}

function switchWeatherChanged(inputEvent) {
    localStorage.setItem(SHOW_WEATHER_OPTION.storageKey, inputEvent.target.checked)
}

function zipcodeChanged(inputEvent) {
    localStorage.setItem(ZIPCODE_OPTION.storageKey, inputEvent.target.value)
}

function weatherApiKeyChanged(inputEvent) {
    localStorage.setItem(WEATHER_API_KEY_OPTION.storageKey, inputEvent.target.value)
}

function nflTeamChanged(inputEvent) {
    localStorage.setItem(NFL_TEAM_OPTION.storageKey, inputEvent.target.value)
}

function weatherUnitsChanged(inputEvent) {
    localStorage.setItem(UNITS_OPTION.storageKey, inputEvent.target.value)
}

function loadOptionsData() {
    data = {}
    OPTIONS.forEach(function(option) {
        var value = option.loader(option)
        data[option.storageKey] = option.loader(option)
    })

    return data
}

function prepareOptionsUI() {
    OPTIONS.forEach(function(option) {
        var value = option.loader(option)
        var element = document.getElementById(option.elementId)
        element[option.property] = value
        element.onchange = option.mutator
    })
}

