export default {
  data() {
    return { windowWidth: window.innerWidth };
  },
  mounted() {
    this.$nextTick((): void => {
      window.addEventListener("resize", this.onResize);
    });
  },
  beforeUnmount(): void {
    window.removeEventListener("resize", this.onResize);
  },
  computed: {
    breakpoint(): string {
      let bp = "xs";
      if (this.windowWidth >= 576) bp = "sm";
      if (this.windowWidth >= 768) bp = "md";
      if (this.windowWidth >= 992) bp = "lg";
      if (this.windowWidth >= 1200) bp = "xl";
      return bp;
    },
  },
  methods: {
    onResize(): void {
      this.windowWidth = window.innerWidth;
    },
  },
};
