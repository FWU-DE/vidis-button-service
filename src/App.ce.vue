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
  inject: {
    size: {
      default: "L",
    },
  },
  computed: {
    entranceComponent(): string {
      console.log("entranceComponent size", this.size);
      if (this.size === "L" || this.size === "M") return "entrance";
      else if (this.size === "S") return "smallEntrance";
      else return "entrance";
    },
  },
});
</script>
