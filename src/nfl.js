var request = new XMLHttpRequest()
const team = options.nflTeam.toUpperCase();
var homeScore, awayScore, homeTeam, awayTeam, quarter, timeReamining, day, time;

function renderScore() {
    var clock = timeReamining != null ? "Q" + quarter + " - " + timeReamining : 
                    quarter === "F" ? "Final" : 
                    quarter === "P" ? "Game at " + time + "PM EST/EDT " + day :
                    quarter === "H" ? "Half-Time" : "Please check schedule for game time";
    document.getElementById("nfl-away-team").textContent = awayTeam + " - " + awayScore;
    document.getElementById("nfl-home-team").textContent = homeTeam + " - " + homeScore;
    document.getElementById("nfl-game-time").textContent = clock;
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
            timeReamining = scores[x].getAttribute('k');
            quarter = scores[x].getAttribute('q');
            day = scores[x].getAttribute('d');
            time = scores[x].getAttribute('t');
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