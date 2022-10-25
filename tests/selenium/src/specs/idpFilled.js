const testName = "Should redirect when idp is filled";

const {
  getDriver,
  navigate_to_website,
  write_idp,
  write_idpdatafile,
  click_entranceButton,
  check_if_redirected,
  take_screenshot,
  get_browser_logs,
  done,
} = require("../helpers.js");

module.exports = async () => {
  const driver = await getDriver();

  try {
    await navigate_to_website(driver);

    //loginurl* ("https://..."): eine aus der Liste
    await write_idp(driver, "rp-schulcampus-s");
    await write_idpdatafile(driver, "idps-dev");
    await click_entranceButton(driver);
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
