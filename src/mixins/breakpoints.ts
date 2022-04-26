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
      const width = this.windowWidth;
      let bp = "xs";
      if (width >= 576) bp = "sm";
      if (width >= 768) bp = "md";
      if (width >= 992) bp = "lg";
      if (width >= 1200) bp = "xl";
      return bp;
    },
  },
  methods: {
    onResize() {
      this.windowWidth = window.innerWidth;
    },
  },
};
