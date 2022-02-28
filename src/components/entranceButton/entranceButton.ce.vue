<template>
  <Button label="Login" @click="handleLogin" />
  <br />
  <idpSelector v-if="showIDPSelector" />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import Button from "primevue/button";
import idpSelector from "@/components/idpSelector/idpSelector.ce.vue";

export default defineComponent({
  name: "entranceButton",
  props: {},
  components: { Button, idpSelector },
  data() {
    return {
      showIDPSelector: false,
    };
  },
  methods: {
    handleLogin() {
      this.showIDPSelector = true;
    },
  },
});
</script>
