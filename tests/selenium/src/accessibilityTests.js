/*
    usage: ACCESSIBILITY=all npm run accessibility:chrome
           ACCESSIBILITY=all is optional. It will also output passed and inapplicable tests
*/

const landingPage = require("./accessibility/tests/landingPage.js");
const autocompleteEmpty = require("./accessibility/tests/autocompleteEmpty.js");
const autocompleteFilled = require("./accessibility/tests/autocompleteFilled.js");
const helpPage = require("./accessibility/tests/helpPage.js");
const customButton = require("./accessibility/tests/customButton.js");

const SEQUENTIAL_TEST = process.env.SEQUENTIAL_TEST === "true";

const tests = [
  async () => landingPage(),
  async () => autocompleteEmpty(),
  async () => autocompleteFilled(),
  async () => helpPage(),
  async () => customButton(),
];

const parallelTests = async function () {
  Promise.all(
    tests.map(async (test) => {
      test();
    })
  );
};

const sequentialTests = async function () {
  for (const test of tests) {
    await test();
  }
};

console.log("> ACCESSIBILITY TESTS ====================");
SEQUENTIAL_TEST ? sequentialTests() : parallelTests();
