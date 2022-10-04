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

function createIcon(type, icon, sizeClass) {
    let iconElement = createElement('i');
    iconElement.classList.add(type);
    iconElement.classList.add(icon);
    iconElement.classList.add(sizeClass);

    return iconElement;
}

