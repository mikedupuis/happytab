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
        if (hour === 0) {
            return 12;
        } else if (hour > 12) {
            return hour - 12;
        } else {
            return hour;
        }
    }

    setTime(date) {
        let hourBase24 = date.getHours();
        let specifier = hourBase24 > 12 ? "PM" : "AM";

        let displayHour = this.getDisplayHour(hourBase24);
        let displayMinute = this.pad(date.getMinutes(), 2);

        this.clockTimeElement.textContent = displayHour + ":" + displayMinute + " " + specifier;
    }

    updateClock() {
        let currentTime = new Date()

        this.setTime(currentTime)
        this.setDate(currentTime)
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async runClock() {
        while (true) {
            this.updateClock();
            await this.sleep(1000);
        }
    }

    insertClockElement() {
        let sideNavElement = document.getElementById('sidenav');
        let clock = createDivWithId('clock')

        sideNavElement.appendChild(clock)

        this.clockTimeElement = createDivWithId('clock-time')
        clock.appendChild(this.clockTimeElement);

        this.clockDateElement = createDivWithId('clock-date') 
        clock.appendChild(this.clockDateElement);
    }
}
