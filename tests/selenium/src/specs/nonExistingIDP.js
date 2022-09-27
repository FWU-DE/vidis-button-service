const testName = "Should not have IDPs in droplist";

const {
  getDriver,
  navigate_to_website,
  click_entranceButton,
  write_searchbox_and_wait_for_droplist,
  isEmptyIdps,
  take_screenshot,
  get_browser_logs,
  done
} = require('../helpers.js');

module.exports = async function() {
  const driver = await getDriver();

  try {
    await navigate_to_website(driver);
    await click_entranceButton(driver);
    await write_searchbox_and_wait_for_droplist(driver, "mich gibt es nicht");
    await isEmptyIdps(driver);

    console.log("• PASS - " + testName);
  } catch(error) {
    console.log("• FAIL - " + testName);
    await get_browser_logs(driver);
    await take_screenshot(driver);
    throw(error);
  } finally {
    done(driver);
  }
}