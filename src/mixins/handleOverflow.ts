export default {
  methods: {
    handleOverflowOfHostpage(hide: boolean) {
      const hostPage = document.getElementsByTagName("body")[0];
      hostPage.style.overflow = hide ? "hidden" : this.originalOverflowValue;
    },
  },
};
