import { shallowMount } from "@vue/test-utils";
import smallEntrance from "@/components/entrance/smallEntrance.ce.vue";

import { messages } from "@/languages/i18nPlugin";
describe("smallEntrance", () => {
  let smallEntranceWrapper;
  beforeEach(() => {
    smallEntranceWrapper = shallowMount(smallEntrance, {
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
  describe("methods", () => {
    describe("toggleDialog", () => {
      test("that it changes showDialog to the input or to false by default", () => {
        smallEntranceWrapper.vm.toggleDialog();
        expect(smallEntranceWrapper.vm.showDialog).toBe(false);
        smallEntranceWrapper.vm.toggleDialog(false);
        expect(smallEntranceWrapper.vm.showDialog).toBe(false);
        smallEntranceWrapper.vm.toggleDialog(true);
        expect(smallEntranceWrapper.vm.showDialog).toBe(true);
      });
    });
  });
});
