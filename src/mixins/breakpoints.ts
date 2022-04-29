export default {
  data() {
    return { windowWidth: window.innerWidth };
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize);
    });
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.onResize);
  },
  computed: {
    breakpoint() {
      let bp = "xs";
      if (this.windowWidth >= 576) bp = "sm";
      if (this.windowWidth >= 768) bp = "md";
      if (this.windowWidth >= 992) bp = "lg";
      if (this.windowWidth >= 1200) bp = "xl";
      return bp;
    },
  },
  methods: {
    onResize() {
      this.windowWidth = window.innerWidth;
    },
  },
};
