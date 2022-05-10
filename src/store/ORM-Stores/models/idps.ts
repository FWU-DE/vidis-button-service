import { Model } from "@vuex-orm/core";

export default class IdP extends Model {
  static entity = "IdPs";

  static fields() {
    return {
      id: this.string(""),
      name: this.string(""),
      type: this.string(""),
      emailDomain: this.string(""),
      address: this.attr({}),
      alternativeSearchTags: this.attr([]),
      additionalInformation: this.string(""),
      img: this.attr(null),
    };
  }
}
