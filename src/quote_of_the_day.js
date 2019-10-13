var request = new XMLHttpRequest()

function setQuote(quote, author) {
    document.getElementById("quote-of-the-day-quote").textContent = quote;
    document.getElementById("quote-of-the-day-author").textContent = ' - ' + author;
}

function setErrorQuote() {
    setQuote('You miss 100% of the shots you don\'t take - Wayne Gretzky', 'Michael Scott')
}

function fetchQuote() {
    const request = new XMLHttpRequest();
    request.timeout = 2000;
    request.onreadystatechange = function(e) {
        if (request.readyState === 4) {
            if (request.status === 200) {
                quote = JSON.parse(request.response).contents.quotes[0];
                setQuote(quote.quote, quote.author);
            } else {
                setErrorQuote();
            }
        }
    }
    request.ontimeout = function () {
        setErrorQuote();
    }
    request.open('GET', 'http://quotes.rest/qod.json', true)
    request.send();
}

if (options.showQuote) {
    fetchQuote();
} else {
    var element = document.getElementById("quote")
    console.log(element)
    element.parentNode.removeChild(element);
}

