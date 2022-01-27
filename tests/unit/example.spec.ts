import { mount } from "@vue/test-utils";
import vidisLogin from "@/components/vidis-login.ce.vue";

describe("vidisLogin.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = "new message";
    console.log("test?");
    const wrapper = mount(vidisLogin, {
      props: { msg },
    });
    console.log("test?2");
  });
});
