import { shallowMount } from "@vue/test-utils";
import IdPAutocomplete from "@/components/idpSelection/idpAutocomplete.ce.vue";
import store from "@/store/index";
import IdPs from "@/store/ORM-Stores/models/idps";
import searchIcon from "@/assets/svgs/search.svg";
import exampleIdps from "./idpsExample.json";
import storeIdps from "./store.json";


import { messages } from "@/languages/i18nPlugin";
describe("IdPAutocomplete", () => {
    let IdPAutocompleteWrapper: any;
    beforeEach(() => {
        IdPAutocompleteWrapper = shallowMount(IdPAutocomplete, {
                mocks: {
                    $t: (key: string) => messages["de"][key],
                },
                store
        });
    });

    describe("methods", () => {
        /**
        * GIVEN: Component
        * WHEN: Component is created
        * THEN: created was called and idps were loaded
            */
        test("idps are being loaded", async() => {
            await IdPAutocompleteWrapper.vm.loadIdps();
            expect(IdPAutocompleteWrapper.vm.idpsInStore).toHaveLength(4);
        });

        describe("computed", () => {
            describe("idpsInStore", () => {
                test("that all idps in store are being returned", async () => {

                });

            })

            describe("schoolLogo", () => {
                test("school logo is being shown in autocomplete reuslts", async () => {

                });

            })
        });
    });
});