const testName = "Should have IDPs in droplist";

const {
  getDriver,
  navigate_to_website,
  click_entranceButton,
  write_searchbox_and_wait_for_droplist,
  isNotEmptyIdps,
  droplist_contains,
  click_firstResult_droplist,
  click_secureLogin,
  check_if_redirected,
  take_screenshot,
  get_browser_logs,
  done,
} = require("../helpers.js");

module.exports = async () => {
  const driver = await getDriver();

  try {
    await navigate_to_website(driver);
    await click_entranceButton(driver);
    await write_searchbox_and_wait_for_droplist(driver, "rlp");
    await isNotEmptyIdps(driver);
    await droplist_contains(driver, "Schulcampus RLP");
    await click_firstResult_droplist(driver);
    await click_secureLogin(driver);
    await check_if_redirected(driver);

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
