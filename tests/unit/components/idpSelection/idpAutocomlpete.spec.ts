import { shallowMount } from "@vue/test-utils";
import IdPAutocomplete from "@/components/idpSelection/idpAutocomplete.ce.vue";
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
        test("idps were loaded on created call", async () => {
/*             const getIdpsSpy = jest.spyOn(
                IdPAutocomplete.methods,
                "loadIdps"
            );
            const IdpAutocompleteWrapperForCreated = shallowMount(IdPAutocomplete, {
                mocks: {
                    $t: (key: string) => messages["de"][key],
                }
            });
            expect(getIdpsSpy).toBeCalled(); */
        });

        describe("computed", () => {
            describe("idpsInStore", () => {
                test("that all idps in store are being returned", async () => {

                });

            })
        });
    });
});