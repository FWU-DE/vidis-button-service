import { shallowMount } from "@vue/test-utils";
import Header from "@/components/layoutElements/vbtnHeader.ce.vue";
import store from "@/store/index";

import { messages } from "@/languages/i18nPlugin";
describe("Entrance", () => {
  let headerWrapper;
  beforeEach(() => {
    headerWrapper = shallowMount(Header, {
      global: {
        plugins: [store],
        mocks: {
          $t: (key) => messages["de"][key],
        },
      },
    });
  });
  describe("computed", () => {
    describe("pushdown", () => {
      test("that it it return 150px if breakpoint is bigger than md", () => {
        expect(Header.computed?.pushdown.call({ breakpoint: "xs" })).toBe("");
        expect(Header.computed?.pushdown.call({ breakpoint: "sm" })).toBe("");
        expect(Header.computed?.pushdown.call({ breakpoint: "md" })).toBe("");
        expect(Header.computed?.pushdown.call({ breakpoint: "lg" })).toBe(
          "150px"
        );
        expect(Header.computed?.pushdown.call({ breakpoint: "xl" })).toBe(
          "150px"
        );
      });
    });
  });
  describe("methods", () => {
    describe("closeDialog", () => {
      test("that it emits the custom Event 'closeDialog' when run", () => {
        headerWrapper.vm.closeDialog();
        expect(headerWrapper.emitted().closeDialog[0]).toEqual([]);
      });
    });
  });
});
