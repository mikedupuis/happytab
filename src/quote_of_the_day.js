class QuoteOfTheDay {
    constructor() { }

    execute() {
        this.insertQuoteElement();
        this.fetchQuote();
    }
    
    setQuote(quote, author) {
        this.quoteElement.textContent = quote;
        this.authorElement.textContent = ' - ' + author;
    }

    setErrorQuote() {
        this.setQuote('You miss 100% of the shots you don\'t take - Wayne Gretzky', 'Michael Scott')
    }

    fetchQuote() {
        const request = new XMLHttpRequest();
        request.timeout = 2000;
        request.onreadystatechange = function(e) {
            if (request.readyState === 4) {
                if (request.status === 200) {
                    this.response = request.response
                    var data = JSON.parse(this.response);

                    var quote = data.contents.quotes[0];
                    this.setQuote(quote.quote, quote.author);
                } else {
                    this.setErrorQuote();
                }
            }
        }.bind(this)
        request.ontimeout = function () {
            this.setErrorQuote();
        }
        request.open('GET', 'http://quotes.rest/qod.json', true)
        request.send();
    }

    insertQuoteElement() {
        var sideNavElement = document.getElementById('sidenav');
        var quote = createDivWithId('quote')

        sideNavElement.appendChild(quote)

        this.quoteElement = createDivWithId('quote-quote')
        quote.appendChild(this.quoteElement);

        this.authorElement = createDivWithId('quote-author')
        quote.appendChild(this.authorElement);
    }
}
