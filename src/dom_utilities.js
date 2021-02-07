function createElementWithId(type, id) {
    var element = document.createElement(type);
    element.id = id;

    return element;
}

function createDivWithId(id) {
    return createElementWithId('div', id);
}

