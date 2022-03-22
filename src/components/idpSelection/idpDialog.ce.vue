<template>
  <Dialog
    v-model:visible="showDialog"
    class="p-dialog-maximized"
    header="Header"
    footer="Footer"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Dialog from "primevue/dialog";

export default defineComponent({
  name: "idp-dialog",
  props: {
    visible: { type: Boolean, default: false },
  },
  components: { Dialog },
  data() {
    return {
      showDialog: false,
    };
  },
  watch: {
    showDialog(newVal: boolean) {
      if (!newVal) this.$emit("closed");
    },
    visible(newVal: boolean) {
      this.showDialog = newVal;
    },
  },
});
</script>
