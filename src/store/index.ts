import { createStore } from "vuex";
import { installedDB } from "./ORM-Stores/index";

export default createStore({
  modules: {},
  plugins: [installedDB],
});
