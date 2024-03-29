import { shallowMount } from "@vue/test-utils";
import Entrance from "@/components/entrance/entrance.ce.vue";
import store from "@/store/index";

import { messages } from "@/languages/i18nPlugin";
describe("Entrance", () => {
  let entranceWrapper: any;
  beforeEach(() => {
    entranceWrapper = shallowMount(Entrance, {
      global: {
        plugins: [store],
        provide: {
          size: "L",
          dark: false,
        },
        mocks: {
          $t: (key: string) => messages["de"][key],
        },
      },
    });
  });
  describe("methods", () => {
    describe("toggleDialog", () => {
      test("that it changes showDialog to the input or to false by default", () => {
        entranceWrapper.vm.toggleDialog();
        expect(entranceWrapper.vm.showDialog).toBe(false);
        entranceWrapper.vm.toggleDialog(false);
        expect(entranceWrapper.vm.showDialog).toBe(false);
        entranceWrapper.vm.toggleDialog(true);
        expect(entranceWrapper.vm.showDialog).toBe(true);
      });
    });
  });
});
