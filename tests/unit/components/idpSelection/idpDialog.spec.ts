import { shallowMount } from "@vue/test-utils";
import IdpDialog from "@/components/idpSelection/idpDialog.ce.vue";

import { messages } from "@/languages/i18nPlugin";
describe("idpDialog", () => {
  let idpDialogWrapper: any;
  beforeEach(() => {
    idpDialogWrapper = shallowMount(IdpDialog, {
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
});
