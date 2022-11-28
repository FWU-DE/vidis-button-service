import { shallowMount } from "@vue/test-utils";
import EntryButton from "@/components/entrance/entryButton.ce.vue";
import store from "@/store/index";
import lockIcon from "@/assets/svgs/lockIcon.svg";
import lockIconInverted from "@/assets/svgs/lockIcon_inverted.svg";
import logoNoText from "@/assets/svgs/LogoNoText.svg";
import logoNoText_inverted from "@/assets/svgs/LogoNoText_inverted.svg";
import getResults from "../idpSelection/getResults.json";
import IdP from "@/store/ORM-Stores/models/idps";
import PrimeVue from "primevue/config";

import { messages } from "@/languages/i18nPlugin";
import axios from "axios";

describe("EntryButton", () => {
  let entryButtonWrapper;
  beforeEach(async () => {
    axios.get = jest.fn().mockResolvedValue({ data: getResults });
    entryButtonWrapper = shallowMount(EntryButton, {
      global: {
        plugins: [store, PrimeVue],
        provide: {
          size: "L",
          dark: false,
        },
        mocks: {
          $t: (key) => {
            let [group, field] = key.split(".");
            return messages["de"][group][field];
          },
        },
      },
    });
    await entryButtonWrapper.vm.$nextTick();
  });
  afterEach(() => {
    entryButtonWrapper.vm.$store.commit("update_idp", "");
  });

  describe("computed", () => {
    describe("size", () => {
      test("that it returns the size in the store", () => {
        expect(entryButtonWrapper.vm.size).toBe("L");
        entryButtonWrapper.vm.$store.commit("update_size", "M");
        expect(entryButtonWrapper.vm.size).toBe("M");
        entryButtonWrapper.vm.$store.commit("update_size", "S");
        expect(entryButtonWrapper.vm.size).toBe("S");
        entryButtonWrapper.vm.$store.commit("update_size", "kfowe");
        expect(entryButtonWrapper.vm.size).toBe("L");
      });
    });
    describe("idpdatafile", () => {
      test("that it returns the idpdatafile in the store", () => {
        expect(entryButtonWrapper.vm.idpdatafile).toBe("idps");
        entryButtonWrapper.vm.$store.commit("update_idpdatafile", "idps-dev");
        expect(entryButtonWrapper.vm.idpdatafile).toBe("idps-dev");
        entryButtonWrapper.vm.$store.commit("update_idpdatafile", "idps-test");
        expect(entryButtonWrapper.vm.idpdatafile).toBe("idps-test");
        entryButtonWrapper.vm.$store.commit("update_idpdatafile", "kfowe");
        expect(entryButtonWrapper.vm.idpdatafile).toBe("kfowe");
      });
    });
    describe("idphintname", () => {
      test("that it returns the idphintname in the store", () => {
        expect(entryButtonWrapper.vm.idphintname).toBe("kc_idp_hint");
        entryButtonWrapper.vm.$store.commit("update_idphintname", "idp_hint");
        expect(entryButtonWrapper.vm.idphintname).toBe("idp_hint");
        entryButtonWrapper.vm.$store.commit(
          "update_idphintname",
          "eokrofkeorf"
        );
        expect(entryButtonWrapper.vm.idphintname).toBe("eokrofkeorf");
      });
    });
    describe("loginurl", () => {
      test("that it returns the loginurl in the store", () => {
        expect(entryButtonWrapper.vm.loginurl).toBe("");
        entryButtonWrapper.vm.$store.commit(
          "update_loginurl",
          "https://foo.bar"
        );
        expect(entryButtonWrapper.vm.loginurl).toBe("https://foo.bar");
      });
    });
    describe("idp", () => {
      test("that it returns the idp in the store", () => {
        expect(entryButtonWrapper.vm.idp).toBe("");
        entryButtonWrapper.vm.$store.commit("update_idp", "foo");
        expect(entryButtonWrapper.vm.idp).toBe("foo");
        entryButtonWrapper.vm.$store.commit("update_idp", "");
      });
    });
    describe("_idp", () => {
      test("that it returns the _idp in the store", () => {
        expect(entryButtonWrapper.vm._idp).toBe(null);
        IdP.create({
          data: [
            {
              id: "foo",
              name: "foo",
            },
          ],
        });
        entryButtonWrapper.vm.$store.commit("update_idp", "foo");
        expect(entryButtonWrapper.vm._idp.name).toBe("foo");
      });
    });
    describe("idpPreselected", () => {
      test("that it returns the idpPreselected in the store", () => {
        expect(entryButtonWrapper.vm.idpPreselected).toBe(false);
      });
    });
    describe("idpPreConfigured", () => {
      test("that it returns the idpPreConfigured in the store", () => {
        expect(entryButtonWrapper.vm.idpPreConfigured).toBe(false);
        entryButtonWrapper.vm.$store.commit("update_idp", "foo");
        expect(entryButtonWrapper.vm.idpPreConfigured).toBe(true);
        entryButtonWrapper.vm.$store.commit("update_idp", "");
        expect(entryButtonWrapper.vm.idpPreConfigured).toBe(false);
      });
    });
    describe("icon", () => {
      test("that it uses the correct icons on size S (small)", () => {
        //uses normal entrance component when size = L or M
        expect(
          EntryButton.computed?.icon.call({
            size: "S",
            buttonHovered: false,
            logoNoText,
            logoNoText_inverted,
          })
        ).toBe(logoNoText);
        expect(
          EntryButton.computed?.icon.call({
            size: "S",
            buttonHovered: true,
            logoNoText,
            logoNoText_inverted,
          })
        ).toBe(logoNoText);
      });
      test("that it uses the correct icons on size M (medium) or L (Large)", () => {
        //uses normal entrance component when size = L or M
        expect(
          EntryButton.computed?.icon.call({
            size: "M",
            buttonHovered: false,
            lockIcon,
            lockIconInverted,
          })
        ).toBe(logoNoText);
        expect(
          EntryButton.computed?.icon.call({
            size: "M",
            buttonHovered: true,
            lockIcon,
            lockIconInverted,
          })
        ).toBe(logoNoText);
        expect(
          EntryButton.computed?.icon.call({
            size: "L",
            buttonHovered: false,
            lockIcon,
            lockIconInverted,
          })
        ).toBe(logoNoText);
        expect(
          EntryButton.computed?.icon.call({
            size: "L",
            buttonHovered: true,
            lockIcon,
            lockIconInverted,
          })
        ).toBe(logoNoText);
      });
    });
  });
  describe("methods", () => {
    describe("reloadPreselectedIdp", () => {
      test("that it shows the default Label", async () => {
        entryButtonWrapper.vm.loadIdpsSelection = jest.fn();
        await entryButtonWrapper.vm.reloadPreselectedIdp();
        expect(entryButtonWrapper.vm.buttonLabel).toBe("Anmelden");
        expect(entryButtonWrapper.vm.loadIdpsSelection).not.toHaveBeenCalled();

        IdP.create({
          data: [
            {
              id: "foo",
              name: "foo",
            },
          ],
        });
        entryButtonWrapper.vm.$store.commit("update_idp", "dfsdf");
        await entryButtonWrapper.vm.reloadPreselectedIdp();
        expect(entryButtonWrapper.vm.buttonLabel).toBe("Anmelden");
      });
      test("that it loads the IDPS", async () => {
        entryButtonWrapper.vm.loadIdpsSelection = jest.fn();
        IdP.deleteAll();
        entryButtonWrapper.vm.$store.commit("update_idp", "foo");
        expect(entryButtonWrapper.vm.idpPreConfigured).toBe(true);
        await entryButtonWrapper.vm.reloadPreselectedIdp();
        expect(entryButtonWrapper.vm.loadIdpsSelection).toHaveBeenCalled();
      });
      test("that it tries to find the configured IDP", async () => {
        IdP.create({
          data: [
            {
              id: "foo",
              name: "foo",
            },
          ],
        });
        entryButtonWrapper.vm.$store.commit("update_idp", "foo");
        await entryButtonWrapper.vm.reloadPreselectedIdp();
        expect(entryButtonWrapper.vm.buttonLabel).toBe("Weiter mit foo");
      });
    });
    describe("clicked", () => {
      test("that it emits the custom Event 'clicked' when run", () => {
        entryButtonWrapper.vm.clicked();
        expect(entryButtonWrapper.emitted().clicked[0]).toEqual([]);
      });
    });
    describe("loadIdpsSelection", () => {
      test("that text of button is 'Anmelden mit deinem Schulaccount' when run without selected idp in cookie", async () => {
        expect(entryButtonWrapper.vm.buttonLabel).toBe("Anmelden");
      });
      test("that text of button is 'Weiter mit ' when run with selected idp in cookie", async () => {
        entryButtonWrapper.vm.$store.commit("update_cookie", false);
        entryButtonWrapper.vm.$store.commit("update_cookie", true);
        entryButtonWrapper.vm.setCookie(1, "");
        await entryButtonWrapper.vm.loadIdpsSelection();
        expect(entryButtonWrapper.vm.buttonLabel).toBe(
          "Weiter mit SuBITI Bremen"
        );
      });
    });
  });
});
