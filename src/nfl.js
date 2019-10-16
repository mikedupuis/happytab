var request = new XMLHttpRequest()
const team = options.nflTeam.toUpperCase();
var homeScore, awayScore, homeTeam, awayTeam, quarter, timeReamining, day, time;

const ATTRIBUTES = {
    VISITOR_TEAM_NAME: 'v',
    VISITOR_TEAM_SCORE: 'vs',
    HOME_TEAM_NAME: 'h',
    HOME_TEAM_SCORE: 'hs',
    QUARTER: 'q',
    TIME_REMAINING: 'l',
    GAME_TIME: 't',
    GAME_DAY: 'd',
}

const QUARTER_VALUES = {
    PREGAME: 'P',
    HALFTIME: 'H',
    FINAL: 'F',
    GAME: ['1', '2', '3', '4'],
}

const HOME_TEAM_DATA = {
    nameElementId: 'nfl-home-team-name',
    logoElementId: 'nfl-home-team-logo',
    nameXmlAttribute: ATTRIBUTES.HOME_TEAM_NAME,
    scoreXmlAttribute: ATTRIBUTES.HOME_TEAM_SCORE
}

const AWAY_TEAM_DATA = {
    nameElementId: 'nfl-away-team-name',
    logoElementId: 'nfl-away-team-logo',
    nameXmlAttribute: ATTRIBUTES.VISITOR_TEAM_NAME,
    scoreXmlAttribute: ATTRIBUTES.VISITOR_TEAM_SCORE
}

function isGameOver(game) {
    return game.getAttribute(ATTRIBUTES.QUARTER) === QUARTER_VALUES.FINAL
}

function isTeamPlaying(team, game) {
    return (game.getAttribute(ATTRIBUTES.HOME_TEAM_NAME) == team || game.getAttribute(ATTRIBUTES.VISITOR_TEAM_NAME) ==  team)
}

function hasGameStarted(game) {
    return game.getAttribute(ATTRIBUTES.QUARTER) !== QUARTER_VALUES.PREGAME
}

function getTeamScore(game, team) {
    return game.getAttribute(team.scoreXmlAttribute)
}

function highlightWinner(game) {
    if (!isGameOver(game)) {
        return false;
    }

    var awayScore = getTeamScore(game, AWAY_TEAM_DATA)
    var homeScore = getTeamScore(game, HOME_TEAM_DATA)

    if (awayScore > homeScore) {
        document.getElementById(AWAY_TEAM_DATA.nameElementId).classList.add('nfl-winner')
    } else if (homeScore > awayScore) {
        document.getElementById(HOME_TEAM_DATA.nameElementId).classList.add('nfl-winner')
    }
}

function renderTeamInfo(game, team) {
    renderTeamLogo(game, team)
    renderTeamNameAndScore(game, team)

    if (isGameOver(game)) {
        highlightWinner(game)
    }
}

function renderTeamLogo(game, team) {
    var teamName = game.getAttribute(team.nameXmlAttribute)
    var teamLogoElement = document.getElementById(team.logoElementId)
    teamLogoElement.src = getLogo(teamName)
}

function renderTeamNameAndScore(game, team) {
    var teamNameElement = document.getElementById(team.nameElementId)
    var teamName = game.getAttribute(team.nameXmlAttribute)
    if (hasGameStarted(game)) {
        var score = getTeamScore(game, team)
        teamNameElement.textContent = teamName + " - " + score
    } else {
        teamNameElement.textContent = teamName;
    }
}

function formatScore(game, team, score) {
    if (hasGameStarted(game)) {
        var score = document.g
        return team + " - " + score;
    }

    return team;
}

function formatClock(game) {
    var quarter = game.getAttribute(ATTRIBUTES.QUARTER)

    if (quarter === QUARTER_VALUES.HALFTIME) {
        return "Half-Time";
    }

    if (quarter === QUARTER_VALUES.FINAL) {
        return "Final";
    }

    if (quarter === QUARTER_VALUES.PREGAME) {
        var gameTime = game.getAttribute(ATTRIBUTES.GAME_TIME)
        var gameDay = game.getAttribute(ATTRIBUTES.GAME_DAY)
        return gameTime + " EST " + gameDay
    }

    if (QUARTER_VALUES.GAME.includes(quarter)) {
        var timeRemaining = game.getAttribute(ATTRIBUTES.TIME_REMAINING)
        return "Q" + quarter + " - " + timeRemaining;
    }

    return "Please check schedule for game time";
}

function getLogo(team) {
    return "../assets/nfl/" + team + ".png"
}

function renderScore(game) {
    renderTeamInfo(game, AWAY_TEAM_DATA)
    renderTeamInfo(game, HOME_TEAM_DATA)
    document.getElementById("nfl-game-time").textContent = formatClock(game);
}

function renderError() {
    document.getElementById("nfl-away-team").textContent = "No Game Found";
}

function retrieveGame(team, games) {
    for (x = 0; x < games.length; x++) {
        if (isTeamPlaying(team, games[x])) {
            return games[x];
        }
    }

    return null;
}

function fetchScore () {
    const request = new XMLHttpRequest();
    request.timeout = 2000;
    request.onreadystatechange = function(e) {
        if (request.readyState === 4) {
            if (request.status === 200) {
                parser = new DOMParser();
                var scores = parser.parseFromString(request.response,"text/xml");
                var game = retrieveGame(team, scores.getElementsByTagName('g'))
                if (game === null) {
                    hideNflDomElements();
                    return;
                } else {
                    renderScore(game);
                }
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

function hideNflDomElements() {
    document.getElementById('nfl').style.display = 'none';
}

if (options.showNFL) {
    fetchScore();
} else {
    hideNflDomElements();
}
