import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import PrimeVue from "primevue/config";

import "/node_modules/primeflex/primeflex.css";
import "primevue/resources/primevue.min.css";

console.log("????????");
import vidisLogin from "@/components/vidis-login.ce.vue";

console.log("??????333??");
customElements.define("vidis-login", vidisLogin);

/* 
const app = createApp(App).use(store);

app.use(PrimeVue);

app.mount("#app"); */
