const testName = "Autocomplete list filled";

const {
  getDriver,
  navigate_to_website,
  click_entranceButton,
  write_searchbox_and_wait_for_droplist,
  done
} = require('../../helpers.js');

const {
  analyze,
  printAnalyzerResults
} = require('../analyzer.js');


module.exports = async function() {
  const driver = await getDriver();

  try {
    await navigate_to_website(driver);
    await click_entranceButton(driver);
    await write_searchbox_and_wait_for_droplist(driver, "rlp");

    const result = await analyze(driver);

    console.log("• PASS - " + testName);
    printAnalyzerResults(result);
  } catch(error) {
    console.log("• FAIL - " + testName);
    printAnalyzerResults(error);
  } finally {
    done(driver);
  }
}