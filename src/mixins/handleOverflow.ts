export default {
  data() {
    return {
      originalOverflowValueBody: "",
      originalOverflowValueHtml: "",
    };
  },
  mounted() {
    const hostBody = document.getElementsByTagName("body")[0];
    this.originalOverflowValueBody = hostBody.style.overflow;
    const hostHtml = document.getElementsByTagName("html")[0];
    this.originalOverflowValueHtml = hostHtml.style.overflow;
  },
  methods: {
    handleOverflowOfHostpage(hide: boolean) {
      const hostBody = document.getElementsByTagName("body")[0];
      hostBody.style.overflow = hide
        ? "hidden"
        : this.originalOverflowValueBody;
      const hostHtml = document.getElementsByTagName("html")[0];
      hostHtml.style.overflow = hide
        ? "hidden"
        : this.originalOverflowValueHtml;
    },
  },
};
