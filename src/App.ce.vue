<template>
  <component :is="entranceComponent" />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import entrance from "@/components/entrance/entrance.ce.vue";
import smallEntrance from "@/components/entrance/smallEntrance.ce.vue";
export default defineComponent({
  name: "vidis-login",
  components: { entrance, smallEntrance },
  computed: {
    size() {
      return this.$store.getters.size;
    },
    entranceComponent(): string {
      if (this.size === "L" || this.size === "M") return "entrance";
      else if (this.size === "S") return "smallEntrance";
      else return "entrance";
    },
  },
});
</script>
