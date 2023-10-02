function createElement(type) {
    return document.createElement(type);
}

function createElementWithId(type, id) {
    let element = createElement(type);
    element.id = id;

    return element;
}

function createDivWithId(id) {
    return createElementWithId('div', id);
}

function createIconWithId(type, icon, sizeClass, id) {
    let iconElement = createElementWithId('i', id);
    iconElement.classList.add(type);
    iconElement.classList.add(icon);
    iconElement.classList.add(sizeClass);

    return iconElement;
}

function deleteItemWithId(id) {
    let element = document.getElementById(id)
    let parent = element.parentElement

    element.classList.add("update-fadeout")
    sleep(500).then(r => parent.removeChild(element))
}

