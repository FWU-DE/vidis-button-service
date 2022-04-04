import { Model } from "@vuex-orm/core";

export default class IdP extends Model {
  static entity = "IdPs";

  static fields() {
    return {
      id: this.string(""),
      name: this.string(""),
      shortName: this.string(""),
      type: this.string(""),
      emailDomain: this.string(""),
      address: this.attr(null),
      alternativeSearchTags: this.string(""),
      additionalInformation: this.string(""),
      img: this.attr(null),
      loginLink: this.string(""),
      forgotLink: this.string(""),
      redirectLink: this.string(""),
    };
  }
}
