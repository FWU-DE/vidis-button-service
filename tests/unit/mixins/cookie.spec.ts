import { defineComponent } from "vue";
import { shallowMount } from "@vue/test-utils";
import { messages } from "@/languages/i18nPlugin";
import cookie from "@/mixins/cookie";

describe("EntryButton", () => {
  let cookieWrapper: any;
  beforeEach(() => {
    cookieWrapper = shallowMount(defineComponent({ mixins: [cookie] }), {
      global: {
        provide: {
          cookie: true,
        },
        mocks: {
          $t: (key: string) => messages["de"][key],
        },
      },
    });
    Object.defineProperty(window.document, "cookie", {
      writable: true,
    });
  });
  describe("methods", () => {
    describe("setCookie & getCookie", () => {
      test("that correctly creates a cookie", () => {
        cookieWrapper.vm.setCookie("test");
        expect(cookieWrapper.vm.getCookie()).toBe("test;path=/");
        cookieWrapper.vm.setCookie("test2");
        expect(cookieWrapper.vm.getCookie()).toBe("test2;path=/");
      });
    });
  });
});
