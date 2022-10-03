const DEFAULT_BACKGROUND_URL = '../assets/bg.jpg'

Array.prototype.shuffle = function() {
	const input = this;

	for (let i = input.length-1; i >=0; i--) {

		const randomIndex = Math.floor(Math.random() * (i + 1));
		const itemAtIndex = input[randomIndex];

		input[randomIndex] = input[i];
        input[i] = itemAtIndex;
    }
    return input;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function preloadImage(url) {
	let cacheImage = new Image();
	cacheImage.src = url;
    while (!cacheImage.complete) {
        await sleep(10)
    }
}

async function setBackgroundImage() {
	backgroundImageURL = localStorage.getItem( "backgroundURL" )

	if ( !backgroundImageURL )
	{
		backgroundImageURL = DEFAULT_BACKGROUND_URL;
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

function shouldUpdateBackground() {
	let storedBackground = localStorage.getItem("backgroundURL");

	if ( !storedBackground )
	{
		return true;
	}

	let backgroundExpiration = localStorage.getItem("backgroundExpirationTimestamp");

	if (!backgroundExpiration) {
		return true;
    }

	return Number(backgroundExpiration) <= Date.now()
}

function updateStoredBackgroundExipration() {
	let expirationPeriod = loadOrDefault(BACKGROUND_ROTATION_PERIOD_OPTION)
	let expirationTime = Date.now() + 1000 * Number(expirationPeriod); // Date.now() returns ms, so convert to seconds
	localStorage.setItem( "backgroundExpirationTimestamp", expirationTime)
}

function updateStoredBackground( reloadBackground ) {
    let request = new XMLHttpRequest();
    request.timeout = 2000;
    request.addEventListener( "load", function(e) {
		if (request.status === 200) {
			const data = JSON.parse(this.response);

			let url = DEFAULT_BACKGROUND_URL;
			let shuffled = data.shuffle();
			for (let i = 0; i < shuffled.length; i++) {
				let image = shuffled[i];
				if (image.width >= screen.width && image.height >= screen.height) {
					url = image.download_url;

					break;
				}
			}

			localStorage.setItem( "backgroundURL", url );
			updateStoredBackgroundExipration()

			if ( reloadBackground ) {
				setBackgroundImage()
			} else {
                preloadImage(url);
            }
        }
	} )

    // Max page as of 9/23/19
    let page = getRandomInt(34);

    request.open('GET', 'https://picsum.photos/v2/list?page=' + page)
	request.send()
}

function assignNewBackgroundFunction() {
	let newBackgroundButton = document.getElementById("newBackgroundButton");

	newBackgroundButton.onclick = loadNewBackground
}

function loadNewBackground() {
	updateStoredBackground( true )
}

if (options.showSidebar) {
    document.getElementById('main').style['margin-left'] = '310px'
} else {
    document.getElementById('sidenav').style.display = 'none'
    document.getElementById('main').style['margin-left'] = '0'
}

assignNewBackgroundFunction()

// Show cached background URL, even if it has expired, to save loading time
setBackgroundImage()

if (shouldUpdateBackground()) {
	updateStoredBackground(false)
}
