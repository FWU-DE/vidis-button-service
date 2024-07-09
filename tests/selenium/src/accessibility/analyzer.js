const AxeBuilder = require("@axe-core/webdriverjs");

const SHOW_ALL_ACCESSIBILITY = process.env.ACCESSIBILITY === "all";
const DISPLAY_RESULTS = process.env.DISPLAY_ACCESSIBILITY_RESULTS === "true";

module.exports.analyze = async function (driver) {
  const axeBuilder = await module.exports.getAxeBuilder(driver);
  const results = await module.exports
    .analyze_customAxe(axeBuilder)
    .then((results) => filterResults(results));
  return parseResults(results);
};

module.exports.analyze_customAxe = async function (axeBuilder) {
  const results = await axeBuilder
    .analyze()
    .then((results) => filterResults(results));
  return parseResults(results);
};

function filterResults(results) {
  if (!SHOW_ALL_ACCESSIBILITY) {
    delete results.passes;
    delete results.inapplicable;
  }

  return results;
}

function parseResults(results) {
  if (
    results &&
    ((results.hasOwnProperty("incomplete") && results.incomplete.length > 0) ||
      (results.hasOwnProperty("violations") && results.violations.length > 0))
  )
    throw JSON.stringify(results, null, 2);

  return SHOW_ALL_ACCESSIBILITY ? JSON.stringify(results, null, 2) : undefined;
}

module.exports.getAxeBuilder = function (driver) {
  return new AxeBuilder(driver);
};

module.exports.printAnalyzerResults = function (results) {
  if (DISPLAY_RESULTS && results) console.log(results);
};
