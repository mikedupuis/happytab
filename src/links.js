function addLinksBox(linkData) {
    let mainContainer = document.getElementById('main');

    // Create the link box
    let linkContainer = document.createElement('div');
    linkContainer.classList.add('card');
    linkContainer.classList.add('semi-transparent');
    mainContainer.appendChild(linkContainer);

    // add the header
    let header = document.createElement('h1')
    let headerText = document.createTextNode(linkData.name)
    header.appendChild(headerText);
    linkContainer.appendChild(header);

    // add the link list
    let list = document.createElement('ul')
    linkContainer.appendChild(list)

    // add the links
    linkData.links.forEach(function(link) {
        let listElement = document.createElement('li')

        let linkElement = document.createElement('a')
        linkElement.innerText = link.text;
        linkElement.setAttribute('href', link.src);

        listElement.appendChild(linkElement);

        list.appendChild(listElement)
    });
}

function logBookmarks() {
    chrome.bookmarks.getTree(
        function traverseBookmarks(bookmarkTreeNodes, nodeName) {
            let links = []
            for(let i = 0; i < bookmarkTreeNodes.length; i++) {
                if(bookmarkTreeNodes[i].children) {
                    traverseBookmarks(bookmarkTreeNodes[i].children, bookmarkTreeNodes[i].title);
                } else {
                    if (bookmarkTreeNodes[i].url && bookmarkTreeNodes[i].title) {
                        links.push({
                            text: bookmarkTreeNodes[i].title,
                            src: bookmarkTreeNodes[i].url
                        })
                    }
                }
            }

            if (links.length > 0) {
                addLinksBox({ "name": nodeName, "links": links })
            }
        }
    )
}

logBookmarks()
