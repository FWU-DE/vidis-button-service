export default {
  inject: {
    cookie: {
      default: false,
    },
  },
  data() {
    return { cookieIdp: this.getCookie() };
  },
  created() {
    this.cookieIdp = this.getCookie();
  },
  methods: {
    addToCookie(idp: string): void {
      if (this.cookie)
        document.cookie = `vbtn=${encodeURIComponent(idp)};path=/`;
    },
    getCookie(): string {
      if (this.cookie) {
        const nameEQ = "vbtn=";
        const foundCookie = document.cookie
          .split("; ")
          .find((c) => c.indexOf(nameEQ) === 0);
        return foundCookie
          ? decodeURIComponent(foundCookie?.substring(nameEQ.length))
          : "";
      } else {
        return "";
      }
    },
  },
};
