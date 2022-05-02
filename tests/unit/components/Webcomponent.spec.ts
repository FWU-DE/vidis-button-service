import * as vue from "vue";
import { VidisLoginApp } from "@/Webcomponent";

describe("Webcomponent", () => {
  beforeAll(() => {
    customElements.define("vidis-login", VidisLoginApp);
  });
  describe("Initialization", () => {
    test("that all necessary methods are called", () => {
      const spyOf_createApp = jest.spyOn(vue, "createApp");
      document.body.innerHTML = `<vidis-login size="L" dark="false"> </vidis-login>`;
      expect(spyOf_createApp).toHaveBeenCalled();
    });
  });
});
