module.exports = {
  preset: "@vue/cli-plugin-unit-jest/presets/typescript-and-babel",
  moduleNameMapper: {
    "\\.(css|scss)$": "identity-obj-proxy",
  },
  setupFiles: ["<rootDir>/tests/setup.ts"],  // Runs BEFORE test framework
};