<template>
  <Dialog
    v-if="helpDialogReady"
    v-model:visible="showDialog"
    class="p-dialog-maximized"
    :closable="false"
    :appendTo="teleportTarget"
    :contentStyle="{ overflow: 'hidden' }"
  >
    <template #header="">
      <helpHeader @closeDialog="toggleDialog(false)" />
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
      teleportTarget: null,
      helpDialogReady: false,
    };
  },
  mounted() {
    this.teleportTarget = this.$el.parentNode.children[0];
    this.helpDialogReady = true;
    this.ready = true;
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
    visible(newVal: boolean): void {
      this.toggleDialog(newVal);
    },
  },
  methods: {
    closeDialog(location: string): void {
      if (location === "help") this.toggleDialog(false);
    },
    toggleDialog(mode: boolean): void {
      if (!mode) this.$emit("closed");
      this.showDialog = mode;
    },
  },
});
</script>
