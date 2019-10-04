const DEFAULTS = {
    //showSidebar: true,
    showClock: false,
    showQuote: true,
    showWeather: true,
    zipcode: 55401
}

const STORAGE_KEYS = {
    //SHOW_SIDEBAR: 'showSidebar',
    SHOW_CLOCK: 'showClock',
    SHOW_QUOTE: 'showQuote',
    SHOW_WEATHER: 'showWeather',
    ZIPCODE: 'zipcode',
}

const SWITCH_SIDEBAR_OPTION = {
    elementId: 'switch-sidebar',
    defaultValue: true,
    storageKey: 'showSidebar',
    loader: newLoadOrDefaultBoolean,
    mutator: switchSidebarChanged,
    property: 'checked'
}

const OPTIONS = [
    SWITCH_SIDEBAR_OPTION
]

function loadOrDefault(key, defaultValue) {
    var result = localStorage.getItem(key)

    if (result) {
        return result;
    }

    localStorage.setItem(key, defaultValue)
    return defaultValue;
}

function loadOrDefaultBoolean(key, defaultValue) {
    return loadOrDefault(key, defaultValue) === 'true' ? true : false
}

function newLoadOrDefaultBoolean(option) {
    return loadOrDefault(option.storageKey, option.defaultValue) == 'true' ? true : false
}

function loadData() {
    var data = {}

    data.showClock = loadOrDefaultBoolean(STORAGE_KEYS.SHOW_CLOCK, DEFAULTS.showClock)
    data.showQuote = loadOrDefaultBoolean(STORAGE_KEYS.SHOW_QUOTE, DEFAULTS.showQuote)
    data.showWeather = loadOrDefaultBoolean(STORAGE_KEYS.SHOW_WEATHER, DEFAULTS.showWeather)
    data.zipcode = loadOrDefault(STORAGE_KEYS.ZIPCODE, DEFAULTS.zipcode)

    return data
}

function setOptions(data) {
    document.getElementById("switch-clock").checked = data.showClock;
    document.getElementById("switch-quote").checked = data.showQuote;
    document.getElementById("switch-weather").checked = data.showWeather;
    document.getElementById("text-zipcode").value = data.zipcode;
}

function switchSidebarChanged(inputEvent) {
    localStorage.setItem(SWITCH_SIDEBAR_OPTION.storageKey, inputEvent.target.checked)
}

function switchClockChanged(inputEvent) {
    localStorage.setItem(STORAGE_KEYS.SHOW_CLOCK, inputEvent.target.checked)
}

function switchQuoteChanged(inputEvent) {
    localStorage.setItem(STORAGE_KEYS.SHOW_QUOTE, inputEvent.target.checked)
}

function switchWeatherChanged(inputEvent) {
    localStorage.setItem(STORAGE_KEYS.SHOW_WEATHER, inputEvent.target.checked)
}

function switchZipcodeChanged(inputEvent) {
    console.log(inputEvent.target)
    localStorage.setItem(STORAGE_KEYS.ZIPCODE, inputEvent.target.value)
}

function setChangeHandlers() {
    document.getElementById("switch-clock").onchange = switchClockChanged;
    document.getElementById("switch-quote").onchange = switchQuoteChanged;
    document.getElementById("switch-weather").onchange = switchWeatherChanged;
    document.getElementById("text-zipcode").onchange = switchZipcodeChanged;
}

function newWay() {
    OPTIONS.forEach(function(option) {
        var value = option.loader(option)
        var element = document.getElementById(option.elementId)
        element[option.property] = value
        element.onchange = option.mutator
    })
}

setOptions(loadData())
setChangeHandlers()
newWay()
