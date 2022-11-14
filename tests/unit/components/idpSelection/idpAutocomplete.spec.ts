import { shallowMount } from "@vue/test-utils";
import IdPAutocomplete from "@/components/idpSelection/idpAutocomplete.ce.vue";
import store from "@/store/index";
import IdpsForBremen from "./idpsForOneState.json";
import IdpsWithoutState from "./idpsWithoutState.json";
import groupedIdps from "./groupedIdps.json";
import idpsInStore from "./idpsInStore.json";
import searchResults from "./searchResults.json";
import getResults from "./getResults.json";
import cookie from "@/mixins/cookie";
import breakpoints from "@/mixins/breakpoints";

import { messages } from "@/languages/i18nPlugin";
import axios from "axios";

describe("IdPAutocomplete", () => {
  let IdPAutocompleteWrapper: any;
  beforeEach(async () => {
    axios.get = jest.fn().mockResolvedValue({ data: getResults });
    IdPAutocompleteWrapper = shallowMount(IdPAutocomplete, {
      global: {
        mixins: [cookie, breakpoints],
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
    await IdPAutocompleteWrapper.vm.$nextTick();

    // await IdPAutocompleteWrapper.vm.loadIdps();
  });

  /**
   * GIVEN IdPAutocomplete component mounted
   * WHEN searching for the name of IdPAutocomplete component
   * THEN IdPAutocomplete component exists
   */
  it("checks if IdPAutocomplete Component exists", () => {
    expect(IdPAutocompleteWrapper.vm.$options.name).toBe("idp-autocomplete");
    expect(IdPAutocompleteWrapper.exists()).toBe(true);
  });

  describe("methods", () => {
    describe("switchToMobile", () => {
      test("that disableTeleport == false and ready == true", async () => {
        Object.defineProperty(window, "innerWidth", {
          writable: true,
          value: 500,
        });

        IdPAutocompleteWrapper.vm.windowWidth = 400;
        await IdPAutocompleteWrapper.vm.$nextTick();
        IdPAutocompleteWrapper.vm.showMobile = false;
        await IdPAutocompleteWrapper.vm.switchToMobile();
        expect(IdPAutocompleteWrapper.vm.disableTeleport).toBe(false);
        expect(IdPAutocompleteWrapper.vm.ready).toBe(true);
      });
    });
    describe("switchToNormal", () => {
      test("that showMobile == false", () => {
        IdPAutocompleteWrapper.vm.switchToNormal();
        expect(IdPAutocompleteWrapper.vm.showMobile).toBe(false);
      });
    });
    describe("loadIdps", () => {
      /**
       * GIVEN: A mocked Nexus
       * WHEN: loading IDPs
       * THEN: IdPs are Loaded
       */
      test("idps are being loaded", async () => {
        const emitToParentSpy = jest.spyOn(
          IdPAutocompleteWrapper.vm,
          "emitToParent"
        );
        IdPAutocompleteWrapper.vm.$store.commit("update_cookie", false);
        IdPAutocompleteWrapper.vm.$store.commit("update_cookie", true);
        IdPAutocompleteWrapper.vm.setCookie(1);
        await IdPAutocompleteWrapper.vm.loadIdps();
        expect(IdPAutocompleteWrapper.vm.idpsInStore).toEqual(idpsInStore);
        expect(emitToParentSpy).toHaveBeenCalled();
      });
    });
    /**
     * GIVEN: Component
     * WHEN: setting a value of idpAutocomplete
     * THEN: selectedIdP value is being emitted to parent
     */
    test("emitToParent", async () => {
      const switchToNormalSpy = jest.spyOn(
        IdPAutocompleteWrapper.vm,
        "switchToNormal"
      );
      IdPAutocompleteWrapper.vm.selectedIdP = IdpsForBremen[0];
      IdPAutocompleteWrapper.vm.emitToParent();
      expect(switchToNormalSpy).toHaveBeenCalled();
      expect(IdPAutocompleteWrapper.emitted().emitSelectedIdp[0]).toEqual([
        IdpsForBremen[0],
      ]);
    });
    /**
     * GIVEN: idps in store
     * WHEN: calling getListOfStates
     * THEN: list of all states is being returned without duplicates
     */
    test("getListOfStates", () => {
      expect(
        JSON.stringify(IdPAutocompleteWrapper.vm.getListOfStates())
      ).toEqual(
        JSON.stringify([
          "Bremen",
          "Rheinland-Pfalz",
          "Sachsen",
          "Brandenburg",
          "Nordrhein-Westfalen",
          "Sonstige",
        ])
      );
    });

    /**
     * GIVEN: idps in store
     * WHEN: calling getIdpsForState
     * THEN: idps for particular state are being returned
     */
    test("getIdpsForState", () => {
      expect(IdPAutocompleteWrapper.vm.getIdpsForState("Bremen")).toHaveLength(
        2
      );
      expect(IdPAutocompleteWrapper.vm.getIdpsForState("Bremen")).toEqual(
        IdpsForBremen
      );
    });

    /**
     * GIVEN: idps in store
     * WHEN: calling getIdpsWithoutState
     * THEN: idps without state are being returned
     */
    test("getIdpsWithoutState", () => {
      expect(IdPAutocompleteWrapper.vm.getIdpsWithoutState()).toHaveLength(2);
      expect(IdPAutocompleteWrapper.vm.getIdpsWithoutState()).toEqual(
        IdpsWithoutState
      );
    });

    /**
     * GIVEN: Idp Autocomplete
     * WHEN: Component is created
     * THEN: idps are being grouped into format that the autocomplete can understand
     */
    test("groupIdps", () => {
      IdPAutocompleteWrapper.vm.getListOfStates = jest
        .fn()
        .mockReturnValue([
          "Bremen",
          "Rheinland-Pfalz",
          "Sachsen",
          "Brandenburg",
          "Nordrhein-Westfalen",
          "Sonstige",
        ]);
      IdPAutocompleteWrapper.vm.groupIdps();
      expect(IdPAutocompleteWrapper.vm.finalGroupedIdps).toEqual(groupedIdps);
    });
    describe("searchGroupedIdps", () => {
      test("normal search", () => {
        IdPAutocompleteWrapper.vm.getListOfStates = jest
          .fn()
          .mockReturnValue([
            "Bremen",
            "Rheinland-Pfalz",
            "Sachsen",
            "Brandenburg",
            "Nordrhein-Westfalen",
            "Sonstige",
          ]);
        IdPAutocompleteWrapper.vm.groupIdps();
        const event = {
          query: "Bre",
        };
        IdPAutocompleteWrapper.vm.searchGroupedIdps(event);
        expect(IdPAutocompleteWrapper.vm.filteredIdps).toEqual(searchResults);
      });
      test("search with no Results", () => {
        IdPAutocompleteWrapper.vm.getListOfStates = jest
          .fn()
          .mockReturnValue([
            "Bremen",
            "Rheinland-Pfalz",
            "Sachsen",
            "Brandenburg",
            "Nordrhein-Westfalen",
            "Sonstige",
          ]);
        IdPAutocompleteWrapper.vm.groupIdps();
        const event = {
          query: "öerorjffsss",
        };
        IdPAutocompleteWrapper.vm.searchGroupedIdps(event);
        expect(IdPAutocompleteWrapper.vm.filteredIdps).toEqual([
          {
            label: "",
            items: [{ noResult: true }],
          },
        ]);
      });
    });
  });

  describe("computed", () => {
    test("that all idps in store are being returned", async () => {
      expect(IdPAutocompleteWrapper.vm.idpsInStore).toEqual(idpsInStore);
    });
  });
});
