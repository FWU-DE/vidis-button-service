import { shallowMount } from "@vue/test-utils";
import Header from "@/components/layoutElements/header.ce.vue";
import EntryButton from "@/components/entrance/entryButton.ce.vue";

import { messages } from "@/languages/i18nPlugin";
describe("Entrance", () => {
  let headerWrapper: any;
  beforeEach(() => {
    headerWrapper = shallowMount(Header, {
      global: {
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
  describe("computed", () => {
    describe("pushdown", () => {
      test("that it changes showDialog to the input or to false by default", () => {
        expect(EntryButton.computed?.pushdown.call({ breakpoint: "xs" })).toBe(
          ""
        );
      });
    });
  });
  describe("methods", () => {
    describe("toggleDialog", () => {
      test("that it changes showDialog to the input or to false by default", () => {
        headerWrapper.vm.toggleDialog();
        expect(headerWrapper.vm.showDialog).toBe(false);
        headerWrapper.vm.toggleDialog(false);
        expect(headerWrapper.vm.showDialog).toBe(false);
        headerWrapper.vm.toggleDialog(true);
        expect(headerWrapper.vm.showDialog).toBe(true);
      });
    });
  });
});
