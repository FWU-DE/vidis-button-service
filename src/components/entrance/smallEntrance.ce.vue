<template>
  <div id="teleportsTarget" />
  <entryButton @clicked="toggleDialog(true)" />
  <idpDialog
    :visible="showDialog"
    class="p-dialog-maximized"
    @closed="toggleDialog(false)"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import idpDialog from "@/components/idpSelection/idpDialog.ce.vue";
import entryButton from "@/components/entrance/entryButton.ce.vue";
import handleOverflow from "@/mixins/handleOverflow";

export default defineComponent({
  name: "smallEntrance",
  props: {},
  components: { entryButton, idpDialog },
  mixins: [handleOverflow],
  data() {
    return {
      showDialog: false,
    };
  },
  methods: {
    toggleDialog(mode?: boolean) {
      this.showDialog = mode ?? false;
      this.handleOverflowOfHostpage(this.showDialog);
    },
  },
});
</script>
