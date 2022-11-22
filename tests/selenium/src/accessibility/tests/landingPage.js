const testName = "Entrance page/Landing page";

const {
  getDriver,
  navigate_to_website,
  click_entranceButton,
  done,
} = require("../../helpers.js");

const { analyze, printAnalyzerResults } = require("../analyzer.js");

module.exports = async function () {
  const driver = await getDriver();

  try {
    await navigate_to_website(driver);
    await click_entranceButton(driver);

    const result = await analyze(driver);

    console.log("• PASS - " + testName);

    printAnalyzerResults(result);
  } catch (error) {
    console.log("• FAIL - " + testName);
    printAnalyzerResults(error);
  } finally {
    done(driver);
  }
};
