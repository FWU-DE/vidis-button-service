import { Model } from "@vuex-orm/core";

export default class Esc extends Model {
  static entity = "Esc";

  static fields() {
    return {
      id: this.string(""),
    };
  }
}
