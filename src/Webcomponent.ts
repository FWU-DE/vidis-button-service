import { App, createApp } from "vue";
import Application from "./App.ce.vue";

import i18n from "@/languages/i18nPlugin";
import store from "@/store/index";
import PrimeVue from "primevue/config";

class VidisLoginApp extends HTMLElement {
  public app?: App;
  constructor() {
    super();
    this.app = createApp(Application);
  }
}

/**
 * This is the class definition of the Webcomponent for the Vidis-Login Button.
 * Notable is that a Vue App is mounted on top of it.
 * It also handles all internal Errors itself.
 */
export class VidisLoginShadowApp extends HTMLElement {
  public shadowRoot: ShadowRoot;
  private shadowApp: VidisLoginApp;
  constructor() {
    super();
    //this.app = createApp(Application);
    this.shadowRoot = this.attachShadow({ mode: "open" });
    customElements.define("vidis-login-vue-app", VidisLoginApp);
    this.shadowApp = document.createElement("vidis-login-vue-app");
    this.shadowApp.setAttribute("id", "vidis-login-vue-app");
  }
  /**
   * Make WC Attributes observable. In order to make the WC aware of the change of its html attributes,
   * the attribute has to be listed here in string format
   */
  static get observedAttributes() {
    return [
      "dark",
      "size",
      "loginurl",
      "cookie",
      "idphintname",
      "opentab",
      "idpdatafile",
      "idp",
      "requestmethod",
    ];
  }

  /**
   * This Callback is fired, when the Webcomponent is first loaded into the Browser
   */
  async connectedCallback() {
    try {
      this.attachErrorEventHandlers();
      //this.app.config.performance = true;
      if (this.shadowApp.app) {
        this.shadowApp.app.config.unwrapInjectedRef = true;
        this.shadowApp.app.config.errorHandler = function (err, vm, info) {
          //Handle Vue Errors
          console.error("app.config.errorHandler", err, vm, info);
        };
        this.shadowApp.app.use(i18n);
        this.shadowApp.app.use(store);
        this.shadowApp.app.use(PrimeVue);

        this.shadowApp.app.mount(this.shadowApp);
        this.appendStyles(true);
        this.shadowRoot.appendChild(this.shadowApp);
      }
    } catch (e) {
      //Handle Errors during Mount
      console.error("global try/catch", e);
    }
  }
  /**
   * Listen to Changes on WCs Attributes and sends them to the Vue App
   * @param attrName name of the attribute, that changed
   * @param oldVal   Old Value of the attribute
   * @param newVal   New Value of the attribute
   */
  attributeChangedCallback(attrName: string, oldVal: string, newVal: string) {
    if (attrName === "size") newVal = newVal.toUpperCase();
    if (attrName === "dark") newVal = JSON.parse(newVal);
    if (attrName === "opentab") newVal = JSON.parse(newVal);
    if (attrName === "cookie") newVal = JSON.parse(newVal);
    if (attrName === "requestmethod") newVal = newVal.toUpperCase();
    store.commit(`update_${attrName}`, newVal);
  }

  /**
   * Add multiple Styles to the WC
   * @param shadow controlles, if the styles are added to the WC directly or the shadowroot of the WC
   * @param styles Array of strings that contain css code. Can be loaded by using !!css-to-string-loader!css-loader!
   */
  appendStyles(shadow = false, styles: string[] = []): void {
    const internalStyles = [
      require("!!./to-string-loader!css-loader!primevue/resources/primevue.min.css"),
      require("!!./to-string-loader!css-loader!/node_modules/primeflex/primeflex.css"),
      require("!!./to-string-loader!css-loader!primevue/resources/themes/tailwind-light/theme.css"),
      require("!!./to-string-loader!css-loader!sass-loader!primeicons/primeicons.css"),
      require("!!./to-string-loader!css-loader!sass-loader!./assets/scss/globals.scss"),
    ];
    internalStyles.concat(styles);
    for (const style of internalStyles) {
      this.appendStyle(shadow, style);
    }
    this.appendFonts();
  }
  /**
   * Add a CSS Style to the WC
   * @param shadow
   * @param style
   */
  appendStyle(shadow = false, style: string): void {
    const element: HTMLElement = document.createElement("style");
    element.innerHTML = style;
    if (!shadow) this.appendChild(element);
    else this.shadowApp?.appendChild(element);
  }

  appendFonts(shadow = false) {
    const style = document.createElement("style");
    style.dataset.description = "Barlow";
    const fonts = [
      require("!!./to-string-loader!css-loader!sass-loader!./assets/scss/fonts.scss"),
    ];
    style.appendChild(document.createTextNode(fonts[0]));
    if (!shadow) this.appendChild(style);
    else this.shadowApp?.appendChild(style);
  }

  /**
   * Adds Eventhandlers that listens Errors and Promise Rejections
   */
  attachErrorEventHandlers(): void {
    //Handle Errors on the Webcomponent Level
    this.addEventListener("error", (error: any) => {
      console.error("wc error", error);
    });

    //Handle Promise Rejections on the Webcomponent Level
    this.addEventListener("unhandledrejection", (error: any) => {
      console.error("wc unhandledrejection", error);
    });
  }
}
