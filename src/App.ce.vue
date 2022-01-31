<template>
  <vidisLogin msg="name" />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import vidisLogin from "@/components/entranceButton/entranceButton.ce.vue";
export default defineComponent({
  name: "vidis-login",
  components: { vidisLogin },
});
</script>

<style>
@import url("https://unpkg.com/primeflex@3.1.0/primeflex.css");
</style>
<style lang="scss" src="@/assets/scss/globals.scss"></style>
<style src="primevue/resources/primevue.min.css"></style>
<style src="primevue/resources/themes/tailwind-light/theme.css"></style>
