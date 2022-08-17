export default {
  beforeMount(el: any, binding: any) {
    el._keydownCallback = (event: any) => {
      if (event.key === "Escape") {
        binding.value();
      }
    };
    document.addEventListener("keydown", el._keydownCallback);
    console.log("addEventListener");
  },
  unmounted(el: any) {
    document.removeEventListener("keydown", el._keydownCallback);
    delete el._keydownCallback;
    console.log("removeEventListener");
  },
};
