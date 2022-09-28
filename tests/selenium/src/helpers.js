const { Builder, until, By, logging } = require("selenium-webdriver");
const firefox = require('selenium-webdriver/firefox');
const chrome = require('selenium-webdriver/chrome');
const screen = { width: 1200, height: 850 };

const assert = require("assert");

const originalUrl = "https://tp.fwu.intension.eu/?version=latest";

function escapeStringRegexp(string) {
	if (typeof string !== 'string') {
		throw new TypeError('Expected a string');
	}

	// Escape characters with special meaning either inside or outside character sets.
	// Use a simple backslash escape when it’s always valid, and a `\xnn` escape when the simpler form would be disallowed by Unicode patterns’ stricter grammar.
	return string
		.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')
		.replace(/-/g, '\\x2d');
}


module.exports.getDriver = async function() {
  const HEADLESS = process.env.HEADLESS === "true";
  const BROWSER = process.env.BROWSER;

  const chromeOptions = new chrome.Options().windowSize(screen).addArguments("disable-web-security");
  const firefoxOptions = new firefox.Options().windowSize(screen);
  if (HEADLESS) {
    chromeOptions.headless();
    firefoxOptions.headless();
  }

  return await new Builder().forBrowser(BROWSER)
    .setChromeOptions(chromeOptions)
    .setFirefoxOptions(firefoxOptions)
    .build();
}

//quit browser/driver. done.
module.exports.done = function(mydriver) {
  mydriver.quit();
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports.navigate_to_website = async function(mydriver) {
  await mydriver.get(originalUrl);
  await mydriver.wait(until.elementLocated(By.css("vidis-login button.entrance-button")), 40000);
}

module.exports.click_entranceButton = async function(mydriver) {
  await sleep(250);
  await mydriver.findElement(By.css("vidis-login button.entrance-button")).click();
}

module.exports.click_help = async function(mydriver) {
  await sleep(250);
  await mydriver.findElement(By.css(".p-dialog-footer > div > div > div > div > button")).click();
}

module.exports.click_firstResult_droplist = async function(mydriver) {
  await sleep(250);
  await mydriver.findElement(By.css(".p-autocomplete-panel .p-autocomplete-item")).click();
}

module.exports.click_secureLogin = async function(mydriver) {
  await sleep(250);
  await mydriver.findElement(By.css("button.idp-choice-button")).click();
}

module.exports.write_searchbox_and_wait_for_droplist = async function(mydriver, text) {
  await mydriver.findElement(By.className("p-autocomplete-input p-inputtext p-component")).sendKeys(text);
  await mydriver.wait(until.elementLocated(By.className('p-autocomplete-panel')), 40000);
}

module.exports.isEmptyIdps = async function(mydriver) {
  await mydriver.wait(until.elementLocated(By.className('idp-noResult')), 40000);
}

module.exports.isNotEmptyIdps = async function(mydriver) {
  await mydriver.wait(until.elementLocated(By.css(".p-autocomplete-panel .p-autocomplete-item")), 40000);
}

module.exports.droplist_contains = async function(mydriver, expectedString) {
  await mydriver.findElement(By.css(".p-autocomplete-panel .p-autocomplete-item .idp-item-label")).getText()
  .then(function(text) {
    assert(text.toLowerCase().includes(expectedString.toLowerCase()), "\"" + text + "\" does not contain \"" + expectedString + "\"");
  });
}

module.exports.enable_cookies = async function(mydriver) {
  await sleep(250);
  await mydriver.findElement(By.css("input#cookie")).click();
}

module.exports.write_idpdatafile = async function(mydriver, text) {
  await mydriver.findElement(By.css("input#idpdatafile")).clear();
  await mydriver.findElement(By.css("input#idpdatafile")).sendKeys(text);
}

module.exports.write_idpincookie = async function(mydriver, text) {
  await mydriver.findElement(By.css("input#idpincookie")).clear();
  await mydriver.findElement(By.css("input#idpincookie")).sendKeys(text);
}

module.exports.write_idp = async function(mydriver, text) {
  await mydriver.findElement(By.css("input#idp")).clear();
  await mydriver.findElement(By.css("input#idp")).sendKeys(text);
}

module.exports.check_if_redirected = async function(mydriver) {
  const differentUrl = new RegExp('^(?!.*('+ escapeStringRegexp(originalUrl) +'))');
  const currentUrl = await mydriver.getCurrentUrl();
  await mydriver.wait(until.urlMatches(differentUrl), 60000, "Page has not redirected! (current url: " + currentUrl + ")");
}

module.exports.take_screenshot = async function(mydriver) {
  const screenshotBase64 = await mydriver.takeScreenshot();
  console.log("Screenshot: " + screenshotBase64);
}

module.exports.click_log_in_with_another_idp = async function (mydriver) {
  await sleep(250);
  await mydriver.findElement(By.css("span.changeIdpButtonLabel")).click();
}

module.exports.delete_preselected_idp = async function (mydriver) {
  await sleep(250);
  await mydriver.findElement(By.css("button.p-button.p-component.resetSelectionIcon")).click();
}

module.exports.get_browser_logs = async function(mydriver) {
  if(process.env.BROWSER === "chrome") {
    await mydriver.manage().logs().get(logging.Type.BROWSER)
      .then(function(entries) {
        entries.forEach(function(entry) {
          console.log('[%s] %s', entry.level.name, entry.message);
        });
      });
    }
}