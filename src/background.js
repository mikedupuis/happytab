const DEFAULT_BACKGROUND_URL = 'assets/bg.jpg'

Array.prototype.shuffle = function() {
    var input = this;
     
    for (var i = input.length-1; i >=0; i--) {
     
        var randomIndex = Math.floor(Math.random()*(i+1)); 
        var itemAtIndex = input[randomIndex]; 
         
        input[randomIndex] = input[i]; 
        input[i] = itemAtIndex;
    }
    return input;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function preloadImage(url) {
    var cacheImage = new Image();
    cacheImage.src = url;
    while (!cacheImage.complete) {
        await sleep(10)
    }
}

async function setBackgroundImage() {
	backgroundImageURL = localStorage.getItem( "backgroundURL" )

	if ( !backgroundImageURL )
	{
		backgroundImageURL = "../assets/bg.jpg"
	}

    await preloadImage(backgroundImageURL);

    document.getElementsByTagName('body')[0].style.backgroundImage = 'url(' + backgroundImageURL + ')';

    document.getElementById('loader').style.visibility = 'hidden';
    document.getElementById('cover').classList.add("hidden");
    document.getElementById('sidenav').classList.add("slide");
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function loaded() {
    alert('loaded')
}

function shouldUpdateBackground() {
	var storedBackground = localStorage.getItem( "backgroundURL" )

	if ( !storedBackground )
	{
		return true;
	}

    var backgroundExpiration = localStorage.getItem( "backgroundExpirationTimestamp" )

    if (!backgroundExpiration) {
		return true;
    }

	return Number(backgroundExpiration) <= Date.now()
}

function updateStoredBackgroundExipration() {
	expirationPeriod = loadOrDefault( BACKGROUND_ROTATION_PERIOD_OPTION )
	localStorage.setItem( "backgroundExpirationTimestamp", Date.now() + Number( expirationPeriod ) )
}

function updateStoredBackground( reloadBackground ) {
    const request = new XMLHttpRequest();
    request.timeout = 2000;
    request.addEventListener( "load", function(e) {
		if (request.status === 200) {
			var data = JSON.parse(this.response);

			var url = DEFAULT_BACKGROUND_URL
			var shuffled = data.shuffle();
			for (var i = 0; i < shuffled.length; i++) {
				var image = shuffled[i]
				if (image.width >= screen.width && image.height >= screen.height) {
					url = image.download_url;

					break;
				}
			}

			localStorage.setItem( "backgroundURL", url );
			updateStoredBackgroundExipration()

			if ( reloadBackground )
			{
				setBackgroundImage()
			}
		}
	} )

    // Max page as of 9/23/19
    page = getRandomInt(34);

    request.open('GET', 'https://picsum.photos/v2/list?page=' + page)
	request.send()
}

function assignNewBackgroundFunction() {
	var newBackgroundButton = document.getElementById( "newBackgroundButton" )

	newBackgroundButton.onclick = loadNewBackground
}

function loadNewBackground() {
	updateStoredBackground( true )
}

if (options.showSidebar) {
    document.getElementById('main').style['margin-left'] = '310px'
    //margin-left: 325px;
} else {
    document.getElementById('sidenav').style.display = 'none'
    document.getElementById('main').style['margin-left'] = '0'
}

assignNewBackgroundFunction()

// Show cached background URL, even if it has expired, to save loading time
setBackgroundImage()

if ( shouldUpdateBackground() )
{
	updateStoredBackground( false )
}
