import { shallowMount } from "@vue/test-utils";
import IdPAutocomplete from "@/components/idpSelection/idpAutocomplete.ce.vue";
import IdPs from "@/store/ORM-Stores/models/idps";
import searchIcon from "@/assets/svgs/search.svg";
import exampleIdps from "./idpsExample.json";


import { messages } from "@/languages/i18nPlugin";
describe("IdPAutocomplete", () => {
    let IdPAutocompleteWrapper: any;
    beforeEach(() => {
        IdPAutocompleteWrapper = shallowMount(IdPAutocomplete, {
                mocks: {
                    $t: (key: string) => messages["de"][key],
                },
        });
    });

    describe("created", () => {
        /**
        * GIVEN: Component
        * WHEN: Component is created
        * THEN: created was called and idps were loaded
            */
        test("idps are being loaded", async () => {
            await IdPAutocompleteWrapper.vm.loadIdps();
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