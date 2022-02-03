import { defineCustomElement } from "vue";
import App from "./App.ce.vue";

customElements.define("vidis-login", defineCustomElement(App));
