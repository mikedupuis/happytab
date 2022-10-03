# HappyTab

<p align="center">
  <img src="assets/pineapple-128.png">
</p>

<br/>

HappyTab is a Chrome browser extension that displays the time and date, weather, quotes and all of your bookmarks in a single, beautiful webpage

Link to the extension on the Chrome Web Store: https://chrome.google.com/webstore/detail/happytab/pfncgbifkmheijfeckfhmkeghcjfgifa

## Getting Started

Getting started is easy! Simply follow the steps below

### Prerequisites

You need Chrome installed on your computer

### Installing

* Clone the repo
* Open the Chrome Extensions page chrome://extensions/
* Enable Developer Mode (top right corner)
* Click Load Unpacked (top left corner)
* Navigate to the repository root directory in your file system
* Confirm your selection
* Open a new tab!

You should see the following:

![Screenshot](assets/screenshot.png)

### Configuration

A number of settings can be configured in the Options page:

![Options](assets/config.png)

##### Feature descriptions

- User links created from bookmarks and displayed on dashboard.
- Sidebar and Clock can be toggled on and off.
- Custom weather updates (Add your Zipcode(s)).


## Built With

Good ol' fashioned JavaScript

## Contributing

Please read [CONTRIBUTING.md](./CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Releases

1. Update the default acknowledged version number if new updates have been added
2. Ensure `manifest.json` includes a new version number
3. Create a release file by running the `create_zip.sh` script
4. Login to Google as the Happytab development account
5. Navigate to the developer portal
6. In the `Your Listings` table, locate the `HappyTab` row and click `Edit`
7. In the `Upload` section, click `Upload Updated Package`
8. Select the file generated above (`happytab.zip`)
9. Click `Upload`

## Authors

* **Mike Dupuis** - *Initial work* - [mikedupuis](https://github.com/mikedupuis)

See also the list of [contributors](./CONTRIBUTORS.md) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](./LICENSE) file for details

## Acknowledgments

[The HappyTab Icon](https://www.flaticon.com/free-icon/pineapple_826934): Icon made by [freepik](https://www.flaticon.com/authors/freepik) from www.flaticon.com
