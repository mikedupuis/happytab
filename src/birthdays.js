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
    displayUpcomingBirthdays(name, date)
    displayAllBirthdays(name, date, --birthdays.length)
}

function saveBirthday(name, date) {
    birthdays.push({ name, date })
    chrome.storage.sync.set({ birthdays: birthdays }, function () {
    });
}

function deleteBirthday(index) {
    birthdays.splice(index, 1)
    chrome.storage.sync.set({ birthdays: birthdays }, function () {
    });
}

function loadBirthdays() {
    chrome.storage.sync.get(['birthdays'], function (result) {
        result.birthdays.forEach((element, index) => {
            displayUpcomingBirthdays(element.name, element.date)
            displayAllBirthdays(element.name, element.date, index)
        });
        birthdays = result.birthdays
    });

}

function displayUpcomingBirthdays(name, date) {

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

function displayAllBirthdays(name, date, index) {
    let birthday = document.createTextNode(`${name} - ${date} - ${index}`)
    let item = document.createElement('li')
    item.appendChild(birthday)
    item.className = 'birthdays-item'
    document.getElementById('all-birthdays').appendChild(item)
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

function toggleModal() {
    modal.classList.toggle("show-modal");
}

function windowOnClick(event) {
    if (event.target === modal) {
        toggleModal();
    }
}

// Open modal
let modal = document.querySelector(".modal");
document.getElementById("manage-birthdays").addEventListener("click", toggleModal);
//Close modal
document.querySelector(".close-button").addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);

document.getElementById('save-birthday').addEventListener('click', getBirthday)

// clearStorage();
