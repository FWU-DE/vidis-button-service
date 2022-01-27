import { Model } from "@vuex-orm/core";

export default class SampleModel extends Model {
  static entity = "SampleModel";

  static fields() {
    return {
      id: this.string(null),
      value: this.string(null),
    };
  }
}
