const nonExistingIDP = require('./specs/nonExistingIDP.js');
const existingIDP = require('./specs/existingIDP.js');
const idpUsedInCookie = require('./specs/idpUsedInCookie.js');
const idpFilled = require('./specs/idpFilled.js');
const loginWithOtherIdp = require('./specs/loginWithOtherIdp.js');

const SEQUENTIAL_TEST = process.env.SEQUENTIAL_TEST === "true";

const tests = [
    async () => nonExistingIDP(),
    async () => existingIDP(),
    async () => idpUsedInCookie(),
    async () => idpFilled(),
    async () => loginWithOtherIdp()
]


const parallelTests = async function() {
    Promise.all(tests.map(async (test) => { test() }));
}

const sequentialTests = async function() {
    for (const test of tests) {
        await test();
    }
}

SEQUENTIAL_TEST ? sequentialTests() : parallelTests();
