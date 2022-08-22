<template>
  <Dialog
    v-model:visible="showDialog"
    class="p-dialog-maximized"
    @keydown.esc="closeDialog('help')"
    :closable="false"
  >
    <template #header="">
      <helpHeader @closeDialog="showDialog = false" />
    </template>
    <helpContent />
  </Dialog>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import Dialog from "primevue/dialog";
import helpHeader from "@/components/help/helpHeader.ce.vue";
import helpContent from "@/components/help/helpContent.vue";
export default defineComponent({
  name: "idp-dialog",
  props: {
    visible: { type: Boolean, default: false },
  },
  components: {
    Dialog,
    helpHeader,
    helpContent,
  },
  data() {
    return {
      showDialog: false,
      receivedIdp: "",
      showButton: false,
      loading: false,
    };
  },
  computed: {
    loginurl() {
      return this.$store.getters.loginurl;
    },
    cookie() {
      return this.$store.getters.cookie;
    },
  },
  watch: {
    showDialog(newVal: boolean): void {
      if (!newVal) this.$emit("closed");
    },
    visible(newVal: boolean): void {
      this.showDialog = newVal;
    },
  },
  methods: {
    closeDialog(location: string): void {
      if (location === "help") this.showDialog = false;
    },
  },
});
</script>
