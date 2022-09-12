import Esc from "@/store/ORM-Stores/models/esc";

export default {
  beforeMount(el: any, binding: any, vnode: any) {
    el._keydownCallback = (event: any) => {
      const esc = Esc.query().last();
      if (
        event.key === "Escape" &&
        esc != null &&
        esc.$id === vnode.props.name
      ) {
        binding.value();
      }
    };
    document.addEventListener("keydown", el._keydownCallback);
    Esc.insert({ data: { id: vnode.props.name } });
  },
  unmounted(el: any) {
    document.removeEventListener("keydown", el._keydownCallback);
    delete el._keydownCallback;
    const esc = Esc.query().last();
    if (esc != null) {
      esc.$delete();
    }
  },
};
