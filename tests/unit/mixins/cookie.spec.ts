import { defineComponent } from "vue";
import { shallowMount } from "@vue/test-utils";
import { messages } from "@/languages/i18nPlugin";
import cookie from "@/mixins/cookie";
import store from "@/store/index";

describe("EntryButton", () => {
  let cookieWrapper: any;
  beforeEach(() => {
    cookieWrapper = shallowMount(defineComponent({ mixins: [cookie] }), {
      global: {
        plugins: [store],
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
        cookieWrapper.vm.$store.commit("update_cookie", true);
        cookieWrapper.vm.setCookie("test");
        expect(cookieWrapper.vm.getCookie()).toBe(
          "test;path=/;SameSite=Lax;Secure"
        );
        expect(cookieWrapper.vm.cookieIdp).toBe(
          "test;path=/;SameSite=Lax;Secure"
        );
        cookieWrapper.vm.setCookie("test2");
        expect(cookieWrapper.vm.getCookie()).toBe(
          "test2;path=/;SameSite=Lax;Secure"
        );
        expect(cookieWrapper.vm.cookieIdp).toBe(
          "test2;path=/;SameSite=Lax;Secure"
        );
        cookieWrapper.vm.setCookie("test2", "");
        expect(cookieWrapper.vm.getCookie()).toBe("test2;path=/;SameSite=Lax;");
        expect(cookieWrapper.vm.cookieIdp).toBe("test2;path=/;SameSite=Lax;");
      });
    });
  });
});
