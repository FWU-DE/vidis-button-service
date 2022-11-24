export default {
  data() {
    return {
      originalOverflowValueBody: "",
      originalOverflowValueHtml: "",
      originalViewportMetaContent: "",
    };
  },
  mounted() {
    const hostBody = document.getElementsByTagName("body")[0];
    this.originalOverflowValueBody = hostBody.style.overflow;
    const hostHtml = document.getElementsByTagName("html")[0];
    this.originalOverflowValueHtml = hostHtml.style.overflow;
    const viewportMeta = document.querySelector('meta[name="viewport"]');
    this.originalViewportMetaContent = viewportMeta?.getAttribute("content");
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
      const viewportMeta = document.querySelector('meta[name="viewport"]');
      const viewportMetaContent = hide
        ? "width=device-width,initial-scale=1,minimum-scale=1"
        : this.originalViewportMetaContent;
      if (viewportMeta && hide)
        viewportMeta.setAttribute("content", viewportMetaContent);
      else if (!viewportMeta && hide) {
        const meta = document.createElement("meta");
        meta.name = "viewport";
        meta.content = viewportMetaContent;
        document.getElementsByTagName("head")[0].appendChild(meta);
      } else if (!hide && !this.originalViewportMetaContent && viewportMeta) {
        viewportMeta.remove();
      } else if (!hide && this.originalViewportMetaContent && viewportMeta) {
        viewportMeta.setAttribute("content", viewportMetaContent);
      }
    },
  },
};
