const testName = "Should be able to log in with another IDP ";

const {
  getDriver,
  navigate_to_website,
  write_idp,
  click_log_in_with_another_idp,
  delete_preselected_idp,
  write_searchbox_and_wait_for_droplist,
  take_screenshot,
  get_browser_logs,
  done,
} = require("../helpers.js");

module.exports = async () => {
  const driver = await getDriver();

  try {
    await navigate_to_website(driver);
    await write_idp(driver, "rp-schulcampus-s");
    await click_log_in_with_another_idp(driver);
    await delete_preselected_idp(driver, "Schulcampus RLP");
    await write_searchbox_and_wait_for_droplist(driver, "newIdp");

    console.log("• PASS - " + testName);
  } catch (error) {
    console.log("• FAIL - " + testName);
    await get_browser_logs(driver);
    await take_screenshot(driver);
    throw error;
  } finally {
    done(driver);
  }
};
