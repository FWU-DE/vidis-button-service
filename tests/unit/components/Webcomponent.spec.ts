import * as vue from "vue";
import { VidisLoginShadowApp } from "@/Webcomponent";

describe("Webcomponent", () => {
  beforeAll(() => {
    customElements.define("vidis-login", VidisLoginShadowApp);
  });
  describe("Initialization", () => {
    test("that all necessary methods are called", () => {
      const spyOf_createApp = jest.spyOn(vue, "createApp");
      document.body.innerHTML = `<vidis-login size="L" dark="false"> </vidis-login>`;
      expect(spyOf_createApp).toHaveBeenCalled();
    });
  });
});
