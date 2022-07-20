import { shallowMount } from "@vue/test-utils";
import EntryButton from "@/components/entrance/entryButton.ce.vue";
import store from "@/store/index";
import lockIcon from "@/assets/svgs/lockIcon.svg";
import lockIconInverted from "@/assets/svgs/lockIcon_inverted.svg";
import logoNoText from "@/assets/svgs/LogoNoText.svg";
import logoNoText_inverted from "@/assets/svgs/LogoNoText_inverted.svg";
import getResults from "../idpSelection/getResults.json";

import { messages } from "@/languages/i18nPlugin";
import axios from "axios";

describe("EntryButton", () => {
  let entryButtonWrapper;
  beforeEach(async () => {
    axios.get = jest.fn().mockResolvedValue({ data: getResults });
    entryButtonWrapper = shallowMount(EntryButton, {
      store,
      global: {
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
  describe("computed", () => {
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
    describe("clicked", () => {
      test("that it emits the custom Event 'clicked' when run", () => {
        entryButtonWrapper.vm.clicked();
        expect(entryButtonWrapper.emitted().clicked[0]).toEqual([]);
      });
    });
    describe("loadIdpsSelection", () => {
      test("that text of button is 'Anmelden mit deinem Schulaccount' when run without selected idp in cookie", async () => {
        expect(entryButtonWrapper.vm.buttonLabel).toBe(
          "Anmelden mit deinem Schulaccount"
        );
      });
      test("that text of button is 'Weiter mit ' when run with selected idp in cookie", async () => {
        entryButtonWrapper.vm.cookieIdp = "1";
        await entryButtonWrapper.vm.loadIdpsSelection();
        expect(entryButtonWrapper.vm.buttonLabel).toBe(
          "Weiter mit SuBITI Bremen"
        );
      });
    });
  });
});
