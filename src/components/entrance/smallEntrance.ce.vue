<template>
  <entryButton @clicked="toggleDialog(true)" />
  <idpDialog
    :visible="showDialog"
    class="p-dialog-maximized"
    @closed="showDialog = false"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import idpDialog from "@/components/idpSelection/idpDialog.ce.vue";
import entryButton from "@/components/entrance/entryButton.ce.vue";
export default defineComponent({
  name: "smallEntrance",
  props: {},
  components: { entryButton, idpDialog },
  data() {
    return {
      showDialog: false,
    };
  },
  methods: {
    toggleDialog(mode?: boolean) {
      this.showDialog = mode ?? false;
    },
  },
});
</script>
