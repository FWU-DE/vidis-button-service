import { mount } from "@vue/test-utils";
import App from "@/App.ce.vue";

describe("vidisLogin.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = "new message";
    console.log("test?");
    const wrapper = mount(App, {
      props: { msg },
    });
    console.log("test?2");
  });
});
