function addLinksBox(linkData) {
    var mainContainer = document.getElementById('main');

    // Create the link box
    var linkContainer = document.createElement('div');
    linkContainer.classList.add('card');
    linkContainer.classList.add('semi-transparent');
    mainContainer.appendChild(linkContainer);

    // add the header
    var header = document.createElement('h1')
    var headerText = document.createTextNode(linkData.name)
    header.appendChild(headerText);
    linkContainer.appendChild(header);

    // add the link list
    var list = document.createElement('ul')
    linkContainer.appendChild(list)

    // add the links
    linkData.links.forEach(function(link) {
        var listElement = document.createElement('li')

        var linkElement = document.createElement('a')
        linkElement.innerText = link.text;
        linkElement.setAttribute('href', link.src);

        listElement.appendChild(linkElement);

        list.appendChild(listElement)
    });
}

function logBookmarks() {
    chrome.bookmarks.getTree(
        function traverseBookmarks(bookmarkTreeNodes, nodeName) {
            links = new Array()
            for(var i=0;i<bookmarkTreeNodes.length;i++) {
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

            links = new Array()
        }
    )
}

logBookmarks()
