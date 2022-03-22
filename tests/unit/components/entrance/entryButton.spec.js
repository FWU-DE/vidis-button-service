import { shallowMount } from "@vue/test-utils";
import EntryButton from "@/components/entrance/entryButton.ce.vue";

import lockIcon from "@/assets/svgs/lockIcon.svg";
import lockIconInverted from "@/assets/svgs/lockIcon_inverted.svg";
import logoNoText from "@/assets/svgs/LogoNoText.svg";
import logoNoText_inverted from "@/assets/svgs/LogoNoText_inverted.svg";

import { messages } from "@/languages/i18nPlugin";
describe("EntryButton", () => {
  let entryButtonWrapper;
  beforeEach(() => {
    entryButtonWrapper = shallowMount(EntryButton, {
      global: {
        provide: {
          size: "L",
          dark: false,
        },
        mocks: {
          $t: (key) => messages["de"][key],
        },
      },
    });
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
  });
});
