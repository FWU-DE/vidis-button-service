import { shallowMount } from "@vue/test-utils";
import IdpDialog from "@/components/idpSelection/idpDialog.ce.vue";
import store from "@/store/index";

import { messages } from "@/languages/i18nPlugin";
describe("idpDialog", () => {
  let idpDialogWrapper: any;
  beforeEach(async () => {
    idpDialogWrapper = shallowMount(IdpDialog, {
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
    await idpDialogWrapper.vm.$nextTick();
  });
  describe("watch", () => {
    describe("showDialog", () => {
      test("that it fires a 'closed' Event when showDialog is set to false", async () => {
        idpDialogWrapper.vm.showDialog = true;
        await idpDialogWrapper.vm.$nextTick();
        expect(idpDialogWrapper.emitted().closed).toBe(undefined);

        idpDialogWrapper.vm.showDialog = false;
        await idpDialogWrapper.vm.$nextTick();
        expect(idpDialogWrapper.emitted().closed[0]).toEqual([]);
      });
    });
    describe("visible", () => {
      test("that it changes showDialog if the property 'visible' is changed", async () => {
        idpDialogWrapper.setProps({ visible: true });
        await idpDialogWrapper.vm.$nextTick();
        expect(idpDialogWrapper.vm.showDialog).toBe(true);

        idpDialogWrapper.setProps({ visible: false });
        await idpDialogWrapper.vm.$nextTick();
        expect(idpDialogWrapper.vm.showDialog).toBe(false);
      });
    });
  });
  describe("methods", () => {
    describe("redirectToIdpLogin", () => {
      test("that setCookie has been called and its not loading anymore", () => {
        const setCookieSpy = jest.spyOn(idpDialogWrapper.vm, "setCookie");
        idpDialogWrapper.vm.receivedIdp = { id: "1" };
        idpDialogWrapper.vm.redirectToIdpLogin();

        expect(idpDialogWrapper.vm.loading).toBe(false);
        expect(setCookieSpy).toHaveBeenCalledWith("1");
      });
    });
    describe("onIdpSelected", () => {
      test("that setCookie has been called and its not loading anymore", () => {
        idpDialogWrapper.vm.onIdpSelected();
        expect(idpDialogWrapper.vm.receivedIdp).toBe(undefined);
        expect(idpDialogWrapper.vm.showButton).toBe(false);
        idpDialogWrapper.vm.onIdpSelected("test");

        expect(idpDialogWrapper.vm.receivedIdp).toBe("test");
        expect(idpDialogWrapper.vm.showButton).toBe(true);
      });
    });
  });
});
