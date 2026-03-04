const nonExistingIDP = require("./specs/nonExistingIDP.js");
const existingIDP = require("./specs/existingIDP.js");
const idpUsedInCookie = require("./specs/idpUsedInCookie.js");
const idpFilled = require("./specs/idpFilled.js");
const loginWithOtherIdp = require("./specs/loginWithOtherIdp.js");

const SEQUENTIAL_TEST = process.env.SEQUENTIAL_TEST === "true";

const tests = [
  async () => nonExistingIDP(),
  async () => existingIDP(),
  // async () => idpUsedInCookie(),
  async () => idpFilled(),
  async () => loginWithOtherIdp(),
];

const testConnectivity = async (url) => {
  const { Builder, By } = require("selenium-webdriver");
  const chrome = require("selenium-webdriver/chrome");
  let driver;
  try {
    const chromeOptions = new chrome.Options().addArguments("headless");
    driver = await new Builder()
      .forBrowser("chrome")
      .setChromeOptions(chromeOptions)
      .build();
    await driver.get(url);
    const title = await driver.getTitle();
    console.log(`> Connectivity test: Loaded ${url}, title:`, title);
    const h1 = await driver.findElement(By.css("h1")).getText();
    console.log("> Connectivity test: Found h1:", h1);
  } catch (e) {
    console.error("> Connectivity test failed:", e);
  } finally {
    if (driver) await driver.quit();
  }
};

const parallelTests = async function () {
  await testConnectivity("https://example.com");
  await testConnectivity(
    "https://tp.fwu.saas-dev.aws.intension.eu/?version=1.14.1-snapshot",
  );
  Promise.all(
    tests.map(async (test) => {
      test();
    }),
  );
};

const sequentialTests = async function () {
  for (const test of tests) {
    await test();
  }
};

console.log("> UI TESTS ===============================");
SEQUENTIAL_TEST ? sequentialTests() : parallelTests();
