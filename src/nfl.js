var request = new XMLHttpRequest()
const team = options.nflTeam.toUpperCase();
var homeScore, awayScor, homeTeam, awayTeam;

function renderScore() {
    document.getElementById("nfl-away-team").textContent = awayTeam + " - " + awayScore;
    document.getElementById("nfl-home-team").textContent = homeTeam + " - " + homeScore;
}

function renderError() {
    document.getElementById("nfl-away-team").textContent = "No Game Found";
}

function searchForTeam(xml) {
    var scores = xml.getElementsByTagName('g');
    for (x = 0; x < scores.length; x++) {         
        if (scores[x].getAttribute('v') == team || scores[x].getAttribute('h') == team) {
            homeTeam = scores[x].getAttribute('h');
            awayTeam = scores[x].getAttribute('v');
            homeScore = scores[x].getAttribute('hs');
            awayScore = scores[x].getAttribute('vs');
            renderScore();
            return;
        }
    }
    renderError();
}

function fetchScore () {
    const request = new XMLHttpRequest();
    request.timeout = 2000;
    request.onreadystatechange = function(e) {
        if (request.readyState === 4) {
            if (request.status === 200) {
                parser = new DOMParser();
                var scores = parser.parseFromString(request.response,"text/xml");
                searchForTeam(scores);
            } else {
                renderError();
            }
        }
    }
    request.ontimeout = function () {
    }
    request.open('GET', 'http://www.nfl.com/liveupdate/scorestrip/ss.xml', true)
    request.send();
}

if (options.showNFL) {
    fetchScore();
}