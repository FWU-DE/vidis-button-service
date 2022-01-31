<template>
  <AutoComplete field="name" v-model="userInput" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AutoComplete from "primevue/autocomplete";

export default defineComponent({
  name: "vidis-idp-selector",
  props: {
    msg: String,
  },
  components: { AutoComplete },
  data() {
    return {
      userInput: "",
    };
  },
});
</script>
