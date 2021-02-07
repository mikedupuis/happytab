class Clock {
    static DAY_NAMES = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friay",
        "Saturday"
    ];

    static MONTH_NAMES = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];

    constructor() { }

    execute() {
        this.insertClockElement();
        this.runClock();
    }

    getDayName(i) {
        return Clock.DAY_NAMES[i];
    }

    getMonthName(i) {
        return Clock.MONTH_NAMES[i];
    }

    setDate(date) {
        this.clockDateElement.textContent = this.getDayName(date.getDay()) + ", " + this.getMonthName(date.getMonth()) + " " + date.getDate() + ", " + date.getFullYear();
    }

    pad(num, size) {
        var s = num+"";
        while (s.length < size) s = "0" + s;
        return s;
    }

    getDisplayHour(hour) {
        if (hour == 0) {
            return 12;
        } else if (hour > 12) {
            return hour - 12;
        } else {
            return hour;
        }
    }

    setTime(date) {
        var hourBase24 = date.getHours();
        var specifier = hourBase24 > 12 ? "PM" : "AM";

        var displayHour = this.getDisplayHour(hourBase24);
        var displayMinute = this.pad(date.getMinutes(), 2);

        var time = displayHour + ":" + displayMinute + " " + specifier;
        this.clockTimeElement.textContent = time;
    }

    updateClock() {
        var currentTime = new Date()

        this.setTime(currentTime)
        this.setDate(currentTime)
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async runClock() {
        while (true) {
            this.updateClock();
            await sleep(1000);
        }
    }

    insertClockElement() {
        var sideNavElement = document.getElementById('sidenav');
        var clock = createDivWithId('clock')

        sideNavElement.appendChild(clock)

        this.clockTimeElement = createDivWithId('clock-time')
        clock.appendChild(this.clockTimeElement);

        this.clockDateElement = createDivWithId('clock-date') 
        clock.appendChild(this.clockDateElement);
    }
}
