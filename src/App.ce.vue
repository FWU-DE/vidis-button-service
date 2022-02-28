<template>
  <vidisLogin />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import vidisLogin from "@/components/entranceButton/entranceButton.ce.vue";
export default defineComponent({
  name: "vidis-login",
  components: { vidisLogin },
  props: {},
});
</script>
