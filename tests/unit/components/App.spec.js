import { shallowMount } from "@vue/test-utils";
import App from "@/App.ce.vue";

import { messages } from "@/languages/i18nPlugin";
describe("App", () => {
  let appWrapper;
  beforeEach(() => {
    appWrapper = shallowMount(App, {
      global: {
        provide: {
          size: "L",
          dark: false,
        },
        mocks: {
          $t: (key) => messages["de"][key],
        },
      },
    });
  });
  describe("computed", () => {
    describe("entranceComponent", () => {
      test("that it uses the correct component configuration based on size", () => {
        //uses normal entrance component when size = L or M or none
        expect(App.computed?.entranceComponent.call({ size: undefined })).toBe(
          "entrance"
        );
        expect(App.computed?.entranceComponent.call({ size: "L" })).toBe(
          "entrance"
        );
        expect(App.computed?.entranceComponent.call({ size: "M" })).toBe(
          "entrance"
        );
        //uses small entrance component when size = S
        expect(App.computed?.entranceComponent.call({ size: "S" })).toBe(
          "smallEntrance"
        );
      });
    });
  });
});
