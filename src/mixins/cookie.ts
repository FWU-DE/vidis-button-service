export default {
  data() {
    return {
      reloadCookie: false,
    };
  },
  computed: {
    cookie() {
      return this.$store.getters.cookie;
    },
    cookieIdp() {
      this.reloadCookie;
      return this.getCookie();
    },
  },
  methods: {
    setCookie(idp: string): void {
      if (this.cookie) {
        document.cookie = `vbtn=${encodeURIComponent(idp)};path=/`;
        this.reloadCookie = !this.reloadCookie;
      }
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
