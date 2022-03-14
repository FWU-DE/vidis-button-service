import { createI18n } from "vue-i18n";

import de from "@/languages/de";
const messages: any = {
  de,
};
export default createI18n({
  locale: "de", // set locale
  fallbackLocale: "de", // set fallback locale
  messages, // set locale messages
});

export { messages };
