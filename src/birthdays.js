let birthdays = []

loadBirthdays()

function getBirthday() {
    let name = document.getElementById('birthday-name').value
    let date = document.getElementById('birthday-date').value

    let dd = date.substr(8, 10)
    let mm = date.slice(5, 7)
    let yyyy = date.slice(0, 4)

    console.log(dd)
    console.log(mm)
    console.log(yyyy)

    saveBirthday(name, date)
    displayBirthday(name, date)
}

function saveBirthday(name, date) {
    birthdays.push({ name, date })
    chrome.storage.sync.set({ birthdays: birthdays }, function () {
    });
}

function loadBirthdays() {
    chrome.storage.sync.get(['birthdays'], function (result) {
        result.birthdays.forEach(element => {
            displayBirthday(element.name, element.date)
        });
        birthdays = result.birthdays
    });

}

function displayBirthday(name, date) {

    let differenceInDaysSeting = 1

    let date1 = new Date(getCurrentDate())
    let date2 = new Date(date)

    let DifferenceInTime = date2.getTime() - date1.getTime();
    let DifferenceInDays = DifferenceInTime / (1000 * 3600 * 24);

    if (DifferenceInDays >= 0 && DifferenceInDays <= differenceInDaysSeting) {
        let birthday = document.createTextNode(`${name} - ${date}`)
        let item = document.createElement('li')
        item.appendChild(birthday)
        item.className = 'birthdays-item'
        document.getElementById('upcoming-birthdays').appendChild(item)
    }
}

function getCurrentDate() {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0')
    let mm = String(today.getMonth() + 1).padStart(2, '0')
    let yyyy = today.getFullYear()
    today = yyyy + '-' + mm + '-' + dd;

    return today
}

function clearStorage() {
    chrome.storage.sync.clear(function () {
        var error = chrome.runtime.lastError;
        if (error) {
            console.error(error);
        }
    })
}

document.getElementById('save-birthday').addEventListener('click', getBirthday)

// To set two dates to two variables 
let date1 = new Date("2019-01-31");
var date2 = new Date("2019-01-31");

// To calculate the time difference of two dates 
var Difference_In_Time = date2.getTime() - date1.getTime();

// To calculate the no. of days between two dates 
var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

console.log(Difference_In_Days)

console.log(getCurrentDate())