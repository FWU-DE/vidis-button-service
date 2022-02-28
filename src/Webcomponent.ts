import { createApp } from "vue";
import App from "./App.ce.vue";

/**
 * This is the class definition of the Webcomponent for the Vidis-Login Button.
 * Notable is that a Vue App is mounted on top of it.
 * It also handles all internal Errors itself.
 */
export class VidisLoginApp extends HTMLElement {
  /**
   * Make WC Attributes observable. In order to make the WC aware of the change of its html attributes,
   * the attribute has to be listed here in string format
   */
  static get observedAttributes() {
    return [];
  }

  /**
   * This Callback is fired, when the Webcomponent is first loaded into the Browser
   */
  connectedCallback() {
    try {
      this.attachErrorEventHandlers();
      const app = createApp(App);

      app.config.errorHandler = function (err, vm, info) {
        //Handle Vue Errors
        console.error("app.config.errorHandler", err, vm, info);
      };

      app.mount(this);
      this.appendStyles();
    } catch (e) {
      //Handle Errors during Mount
      console.warn("global try/catch", e);
    }
  }
  /**
   * Listen to Changes on WCs Attributes and sends them to the Vue App
   * @param attrName name of the attribute, that changed
   * @param oldVal   Old Value of the attribute
   * @param newVal   New Value of the attribute
   */
  attributeChangedCallback(attrName: string, oldVal: string, newVal: string) {
    //TODO: implement sending newVal to Vue App
  }

  /**
   * Add multiple Styles to the WC
   * @param shadow controlles, if the styles are added to the WC directly or the shadowroot of the WC
   * @param styles Array of strings that contain css code. Can be loaded by using !!css-to-string-loader!css-loader!
   */
  appendStyles(shadow = false, styles: string[] = []): void {
    const internalStyles = [
      require("!!css-to-string-loader!css-loader!primevue/resources/primevue.min.css"),
      require("!!css-to-string-loader!css-loader!/node_modules/primeflex/primeflex.css"),
      require("!!css-to-string-loader!css-loader!primevue/resources/themes/tailwind-light/theme.css"),
      require("!!css-to-string-loader!css-loader!sass-loader!./assets/scss/globals.scss"),
    ];
    internalStyles.concat(styles);
    for (const style of internalStyles) {
      this.appendStyle(shadow, style);
    }
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
    else this.shadowRoot?.appendChild(element);
  }

  /**
   * Adds Eventhandlers that listens Errors and Promise Rejections
   */
  attachErrorEventHandlers(): void {
    //Handle Errors on the Webcomponent Level
    this.addEventListener("error", (error: any) => {
      console.warn("wc error", error);
    });

    //Handle Promise Rejections on the Webcomponent Level
    this.addEventListener("unhandledrejection", (error: any) => {
      console.warn("wc unhandledrejection", error);
    });

    /* window.addEventListener("error", (error: any) => {
      console.warn("window error", error);
    }); */
    /*  window.addEventListener("unhandledrejection", (error: any) => {
      console.warn("window unhandledrejection", error);
    }); */
  }
}