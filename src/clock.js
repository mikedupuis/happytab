function getDayName(i) {
    var dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friay", "Saturday"];
    return dayNames[i];
}

function getMonthName(i) {
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return months[i];
}

function setDate(date) {
    document.getElementById("clock-date").textContent = getDayName(date.getDay()) + ", " + getMonthName(date.getMonth()) + " " + date.getDate() + " " + date.getFullYear();
}

function pad(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}

function setTime(date) {
    var hourBase24 = date.getHours();
    var specifier = hourBase24 > 12 ? "PM" : "AM";

    var displayHour;
    if (hourBase24 == 0) {
        displayHour = 12;
    } else if (hourBase24 > 12) {
        displayHour = hourBase24 - 12;
    } else {
        displayHour = hourBase24;
    }

    var displayMinute = pad(date.getMinutes(), 2);
    var displaySecond = pad(date.getSeconds(), 2);

    // Note that when seconds are displayed, the time can start looking a little funky
    // H:MM:SS
    //var time = displayHour + ":" + displayMinute + ":" + displaySecond;
    // H:MM
    var time = displayHour + ":" + displayMinute + " " + specifier;
    document.getElementById("clock-time").textContent = time;
    //document.getElementById("clock-specifier").textContent = specifier;
}

function updateClock() {
    var currentTime = new Date()

    setTime(currentTime)
    setDate(currentTime)
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function runClock() {
    while (true) {
        updateClock();
        await sleep(1000);
    }
}

if (options.showClock) {
    runClock();
}
