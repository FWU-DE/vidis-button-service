import breakpoints from "@/mixins/breakpoints.ts";
describe("EntryButton", () => {
  describe("computed", () => {
    describe("breakpoint", () => {
      test("that correctly returns the name of a breakpoint based on the width provided", () => {
        expect(
          breakpoints.computed?.breakpoint.call({ windowWidth: -10 })
        ).toBe("xs");
        expect(breakpoints.computed?.breakpoint.call({ windowWidth: 0 })).toBe(
          "xs"
        );
        expect(
          breakpoints.computed?.breakpoint.call({ windowWidth: 575 })
        ).toBe("xs");
        expect(
          breakpoints.computed?.breakpoint.call({ windowWidth: 576 })
        ).toBe("sm");
        expect(
          breakpoints.computed?.breakpoint.call({ windowWidth: 767 })
        ).toBe("sm");
        expect(
          breakpoints.computed?.breakpoint.call({ windowWidth: 768 })
        ).toBe("md");
        expect(
          breakpoints.computed?.breakpoint.call({ windowWidth: 991 })
        ).toBe("md");
        expect(
          breakpoints.computed?.breakpoint.call({ windowWidth: 992 })
        ).toBe("lg");
        expect(
          breakpoints.computed?.breakpoint.call({ windowWidth: 1199 })
        ).toBe("lg");
        expect(
          breakpoints.computed?.breakpoint.call({ windowWidth: 1200 })
        ).toBe("xl");
        expect(
          breakpoints.computed?.breakpoint.call({ windowWidth: 1900 })
        ).toBe("xl");
      });
    });
  });
});
