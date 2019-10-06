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

const SHOW_WEATHER_OPTION = {
    elementId: 'switch-weather',
    defaultValue: true,
    storageKey: 'showWeather',
    loader: loadOrDefaultBoolean,
    mutator: switchWeatherChanged,
    property: 'checked'
}

const ZIPCODE_OPTION = {
    elementId: 'text-zipcode',
    defaultValue: 55421,
    storageKey: 'zipcode',
    loader: loadOrDefault,
    mutator: zipcodeChanged,
    property: 'value'
}

const OPTIONS = [
    SHOW_SIDEBAR_OPTION,
    SHOW_CLOCK_OPTION,
    SHOW_QUOTE_OPTION,
    SHOW_WEATHER_OPTION,
    ZIPCODE_OPTION
]

function loadOrDefault(option) {
    var result = localStorage.getItem(option.storageKey)

    if (result) {
        return result
    }

    localStorage.setItem(option.storageKey, option.defaultValue)
    return defaultValue
}

function loadOrDefaultBoolean(option) {
    return loadOrDefault(option) == 'true' ? true : false
}

function updateOptionStorageFromEvent(option, inputEvent) {
    localStorage.setItem(option.storageKey, inputEvent.target.value);
}

function switchSidebarChanged(inputEvent) {
    console.log('switchSidebarChanged')
    localStorage.setItem(SHOW_SIDEBAR_OPTION.storageKey, inputEvent.target.checked)
}

function switchClockChanged(inputEvent) {
    console.log('switchClockChanged')
    localStorage.setItem(SHOW_CLOCK_OPTION.storageKey, inputEvent.target.checked)
}

function switchQuoteChanged(inputEvent) {
    console.log('switchQuoteChanged')
    localStorage.setItem(SHOW_QUOTE_OPTION.storageKey, inputEvent.target.checked)
}

function switchWeatherChanged(inputEvent) {
    console.log('switchWeatherChanged')
    localStorage.setItem(SHOW_WEATHER_OPTION.storageKey, inputEvent.target.checked)
}

function zipcodeChanged(inputEvent) {
    console.log('zipcodeChanged')
    localStorage.setItem(ZIPCODE_OPTION.storageKey, inputEvent.target.value)
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

