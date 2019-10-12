var birthdays = []
let arr = []

loadBirthdays()

function getBirthday() {
    let name = document.getElementById('birthday-name').value
    let date = document.getElementById('birthday-date').value

    if (name === '' || date === '') { return }

    // let dd = date.substr(8, 10)
    // let mm = date.slice(5, 7)
    // let yyyy = date.slice(0, 4)


    saveBirthday(name, date)
    displayUpcomingBirthdays(name, date)
    displayAllBirthdays(name, date, birthdays.length)
}

function saveBirthday(name, date) {
    chrome.storage.sync.get(['birthdays'], function (result) {
        let arr = result.birthdays === undefined ? [] : result.birthdays
        arr.push({ name, date })
        birthdays = arr
        chrome.storage.sync.set({ birthdays: arr }, function () {
        });

    });
}

function deleteBirthday(index) {
    birthdays.splice(index, 1)
    chrome.storage.sync.set({ birthdays: birthdays }, function () {
    });
    location.reload();
}

let differenceInDaysSetting = ''

function loadBirthdays() {
    chrome.storage.sync.get(['differenceInDaysSetting'], function (result) {
        if (result.differenceInDaysSetting === '') {
            chrome.storage.sync.set({ differenceInDaysSetting: 7 }, function () {
                differenceInDaysSetting = 7
            });
        } else {
            differenceInDaysSetting = result.differenceInDaysSetting
        }
        let DifferenceInDays = document.getElementById('difference-in-days')
        DifferenceInDays.value = differenceInDaysSetting
    });

    chrome.storage.sync.get(['birthdays'], function (result) {
        result.birthdays.forEach((element, index) => {
            displayUpcomingBirthdays(element.name, element.date)
            displayAllBirthdays(element.name, element.date, index)
        });
        birthdays = result.birthdays
    });

}

function setDifferenceInDays(num) {
    chrome.storage.sync.set({ differenceInDaysSetting: num }, function () {
        differenceInDaysSetting = num
    });
}

function displayUpcomingBirthdays(name, date) {


    let date1 = new Date(getCurrentDate())
    let date2 = new Date(date)

    let DifferenceInTime = date2.getTime() - date1.getTime();
    let DifferenceInDays = DifferenceInTime / (1000 * 3600 * 24);

    if (DifferenceInDays >= 0 && DifferenceInDays <= differenceInDaysSetting) {
        let newDate = date.replace(/-/g, "/")
        let dd = newDate.substr(8, 10)
        let mm = newDate.slice(5, 7)
        let yyyy = newDate.slice(0, 4)
        let birthday = document.createTextNode(`${name} - ${newDate}`)
        let item = document.createElement('li')
        item.appendChild(birthday)
        item.className = 'birthdays-item'
        document.getElementById('upcoming-birthdays').appendChild(item)
    }
}

function displayAllBirthdays(name, date, index) {
    let newDate = date.replace(/-/g, "/")
    let dd = newDate.substr(8, 10)
    let mm = newDate.slice(5, 7)
    let yyyy = newDate.slice(0, 4)

    let deleteBtn = document.createElement('button')
    deleteBtn.setAttribute('id', index)
    deleteBtn.setAttribute('class', 'birthday-btn delete-btn')
    deleteBtn.innerHTML = 'Delete'
    deleteBtn.addEventListener("click", function () { deleteBirthday(index) })
    let birthday = document.createTextNode(`${name} ${newDate} - ${index}`)
    let item = document.createElement('li')
    item.appendChild(birthday)
    item.appendChild(deleteBtn)
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
document.getElementById("manage-birthdays").addEventListener("click", toggleModal)

//Close modal
document.querySelector(".close-button").addEventListener("click", toggleModal)
window.addEventListener("click", windowOnClick)


document.getElementById('difference-in-days').addEventListener('change', () => {
    let DifferenceInDays = document.getElementById('difference-in-days')
    setDifferenceInDays(DifferenceInDays.value)
})


// get dirthday
document.getElementById('save-birthday').addEventListener('click', getBirthday)