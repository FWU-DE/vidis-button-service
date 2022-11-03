export default {
  data() {
    return {
      windowWidth: window.innerWidth,
      viewportWidth: Math.max(
        document.documentElement.clientWidth || 0,
        window.innerWidth || 0
      ),
      viewportHeight: Math.max(
        document.documentElement.clientHeight || 0,
        window.innerHeight || 0
      ),
    };
  },
  mounted() {
    this.onResize();
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

      this.viewportWidth = Math.max(
        document.documentElement.clientWidth || 0,
        window.innerWidth || 0
      );
      this.viewportHeight = Math.max(
        document.documentElement.clientHeight || 0,
        window.innerHeight || 0
      );

      console.log(
        `size wdith: ${this.viewportWidth}; height: ${this.viewportHeight}`
      );
    },
  },
};
