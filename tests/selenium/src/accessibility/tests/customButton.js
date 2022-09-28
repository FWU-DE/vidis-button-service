const testName = "Custom Button";

const {
  getDriver,
  navigate_to_website,
  write_idp,
  write_idpdatafile,
  done
} = require('../../helpers.js');

const {
  analyze,
  getAxeBuilder,
  analyze_customAxe,
  printAnalyzerResults
} = require('../analyzer.js');


module.exports = async function() {
  const driver = await getDriver();

  try {
    await navigate_to_website(driver);
    await write_idp(driver, "rp-schulcampus-s");
    await write_idpdatafile(driver, "idps-dev");

    const axeBuilder = getAxeBuilder(driver).exclude('html').include('html > body > div > div > vidis-login');
    const result = await analyze_customAxe(axeBuilder);

    console.log("• PASS - " + testName);
    printAnalyzerResults(result);
  } catch(error) {
    console.log("• FAIL - " + testName);
    printAnalyzerResults(error);
  } finally {
    done(driver);
  }
}