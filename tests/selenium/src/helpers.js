const { Builder, until, By, logging } = require("selenium-webdriver");
const firefox = require("selenium-webdriver/firefox");
const chrome = require("selenium-webdriver/chrome");
const screen = { width: 1200, height: 850 };

const assert = require("assert");

const packagejson = require("../../../package.json");

let originalUrl = setOriginalUrl();

function setOriginalUrl() {
  if (process.env.TEST_CICD === "true" || process.env.TEST_CICD) {
    const version = packagejson.version;
    const host =
      process.env.TESTPAGE_HOST ||
      "https://tp.fwu.saas-dev.aws.intension.eu/?version";
    let environment = "";
    switch (process.env.ENVIRONMENT) {
      case "LATEST":
        environment = `latest`;
        break;
      case "PROD":
        environment = `${version}`;
        break;
      case "TEST":
        environment = `${version}-rc`;
        break;
      case "DEV":
        environment = `${version}-snapshot`;
        break;
      default:
        environment = `${version}-snapshot`;
    }
    return `${host}=${environment}`;
  } else return "http://localhost:8080/";
}

console.log("> Running tests on: ", originalUrl);

function escapeStringRegexp(string) {
  if (typeof string !== "string") {
    throw new TypeError("Expected a string");
  }

  // Escape characters with special meaning either inside or outside character sets.
  // Use a simple backslash escape when it’s always valid, and a `\xnn` escape when the simpler form would be disallowed by Unicode patterns’ stricter grammar.
  return string.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
}

const getDriver = async function () {
  const HEADLESS = process.env.HEADLESS === "true";
  const BROWSER = process.env.BROWSER;

  const chromeOptions = new chrome.Options()
    .windowSize(screen)
    .addArguments("disable-web-security");
  const firefoxOptions = new firefox.Options().windowSize(screen);
  if (HEADLESS) {
    chromeOptions.headless();
    firefoxOptions.headless();
  }

  return await new Builder()
    .forBrowser(BROWSER)
    .setChromeOptions(chromeOptions)
    .setFirefoxOptions(firefoxOptions)
    .build();
};

//quit browser/driver. done.
const done = function (mydriver) {
  mydriver.quit();
};

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
async function getShadowRootManually(mydriver) {
  return await mydriver.findElement(By.id("vidislogin")).getShadowRoot();
}
const getVBTNRootElement = async (mydriver) => {
  const shadowElement = await getShadowRootManually(mydriver);
  return shadowElement.findElement(By.id("vidis-login-vue-app"));
};

const getAnyElement = async (mydriver, locator) => {
  const rootElement = await getVBTNRootElement(mydriver);
  return await rootElement.findElement(locator);
};

const elementVisible = async (mydriver, locator) => {
  try {
    const element = await getAnyElement(mydriver, locator);
    return element;
  } catch (e) {
    //console.log(e);
    return false;
  }
};

const waitForElementVisible = async (
  mydriver,
  locator,
  timer = 3000,
  intervalls = 1000
) => {
  if (timer <= intervalls)
    throw new Error("Timer must be bigger than the intervall");

  let timeout;
  return await new Promise((resolve, reject) => {
    const interval = setInterval(async () => {
      let found = await elementVisible(mydriver, locator);
      if (found) {
        resolve(found);
        if (timeout) clearTimeout(timeout);
        clearInterval(interval);
      }
    }, intervalls);
    timeout = setTimeout(() => {
      console.log("Timeout");
      clearInterval(interval);
      reject(new Error("Took to long"));
    }, timer);
  });
};

const navigate_to_website = async function (mydriver) {
  await mydriver.get(originalUrl);
  await mydriver.wait(
    until.elementIsVisible(await getVBTNRootElement(mydriver), 3000)
  );
};

const click_entranceButton = async function (mydriver) {
  await sleep(250);
  const rootElement = await getVBTNRootElement(mydriver);
  await rootElement.findElement(By.css("button.entrance-button")).click();
};

const click_help = async function (mydriver) {
  await sleep(250);
  const rootElement = await getVBTNRootElement(mydriver);
  await rootElement
    .findElement(By.css(".p-dialog-footer > div > div > div > div > button"))
    .click();
};

const click_firstResult_droplist = async function (mydriver) {
  await sleep(250);
  const rootElement = await getVBTNRootElement(mydriver);
  await rootElement
    .findElement(By.css(".p-autocomplete-panel .p-autocomplete-item"))
    .click();
};

const click_secureLogin = async function (mydriver) {
  await sleep(250);
  const rootElement = await getVBTNRootElement(mydriver);
  await rootElement.findElement(By.css("button.idp-choice-button")).click();
};

const write_searchbox_and_wait_for_droplist = async function (mydriver, text) {
  const elem = await getAnyElement(
    mydriver,
    By.className("p-autocomplete-input p-inputtext p-component")
  );
  elem.sendKeys(text);
  await waitForElementVisible(
    mydriver,
    By.className("p-autocomplete-panel"),
    5000
  );
};

const isEmptyIdps = async function (mydriver) {
  await waitForElementVisible(mydriver, By.className("idp-noResult"));
};

const isNotEmptyIdps = async function (mydriver) {
  await waitForElementVisible(
    mydriver,
    By.css(".p-autocomplete-panel .p-autocomplete-item")
  );
};

const droplist_contains = async function (mydriver, expectedString) {
  const item = await getAnyElement(
    mydriver,
    By.css(".p-autocomplete-panel .p-autocomplete-item .idp-item-label")
  );
  let itemText = await item.getText();
  itemText = itemText.toLowerCase();
  assert(
    itemText.includes(expectedString.toLowerCase()),
    '"' + itemText + '" does not contain "' + expectedString + '"'
  );
};

const enable_cookies = async function (mydriver) {
  await sleep(250);
  const elem = await mydriver.findElement(By.css("input#cookie"));
  elem.click();
};

const write_idpdatafile = async function (mydriver, text) {
  const elem = await mydriver.findElement(By.css("input#idpdatafile"));
  elem.clear();
  elem.sendKeys(text);
};

const write_idpincookie = async function (mydriver, text) {
  const elem = await mydriver.findElement(By.css("input#idpincookie"));
  elem.clear();
  elem.sendKeys(text);
};

const write_idp = async function (mydriver, text) {
  const elem = await mydriver.findElement(By.css("input#idp"));
  elem.clear();
  elem.sendKeys(text);
};

const check_if_redirected = async function (mydriver) {
  const differentUrl = new RegExp(
    "^(?!.*(" + escapeStringRegexp(originalUrl) + "))"
  );
  const currentUrl = await mydriver.getCurrentUrl();
  await mydriver.wait(
    until.urlMatches(differentUrl),
    60000,
    "Page has not redirected! (current url: " + currentUrl + ")"
  );
};

const take_screenshot = async function (mydriver) {
  if (process.env.TAKE_SCREENSHOTS === "true") {
    const screenshotBase64 = await mydriver.takeScreenshot();
    console.log("Screenshot: " + screenshotBase64);
  }
};

const click_log_in_with_another_idp = async function (mydriver) {
  const elem = await waitForElementVisible(
    mydriver,
    By.css("span.changeIdpButtonLabel")
  );
  elem.click();
};

const delete_preselected_idp = async function (mydriver) {
  const elem = await waitForElementVisible(
    mydriver,
    By.css("button.p-button.p-component.resetSelectionIcon")
  );
  elem.click();
};

const get_browser_logs = async function (mydriver) {
  if (process.env.BROWSER === "chrome") {
    await mydriver
      .manage()
      .logs()
      .get(logging.Type.BROWSER)
      .then(function (entries) {
        entries.forEach(function (entry) {
          console.log("[%s] %s", entry.level.name, entry.message);
        });
      });
  }
};
module.exports = {
  getDriver,
  done,
  sleep,
  waitForElementVisible,
  getShadowRootManually,
  getVBTNRootElement,
  navigate_to_website,
  click_entranceButton,
  click_help,
  click_firstResult_droplist,
  click_secureLogin,
  write_searchbox_and_wait_for_droplist,
  isEmptyIdps,
  isNotEmptyIdps,
  droplist_contains,
  enable_cookies,
  write_idpdatafile,
  write_idpincookie,
  write_idp,
  check_if_redirected,
  take_screenshot,
  click_log_in_with_another_idp,
  delete_preselected_idp,
  get_browser_logs,
};
