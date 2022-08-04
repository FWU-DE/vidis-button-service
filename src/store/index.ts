import { createStore } from "vuex";
import { installedDB } from "./ORM-Stores/index";
import vbtnAttributes from "@/store/modules/vbtnAttributes";
export default createStore({
  modules: { vbtnAttributes },
  plugins: [installedDB],
});
