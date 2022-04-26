<template>
  <Button
    class="col-12 entrance-button"
    :label="$t('entrance.button')"
    :alt="$t('entrance.button')"
    :class="{ 'small-entrance-button': this.size === 'S' }"
    @click="clicked"
    @mouseover="buttonHovered = true"
    @mouseleave="buttonHovered = false"
  >
    <img alt="logo" :src="icon" style="width: 1.5rem" />
    <span class="ml-2 font-semibold">{{ $t("entrance.button") }}</span>
  </Button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import Button from "primevue/button";

import logo from "@/assets/svgs/Logo.svg";
import lockIcon from "@/assets/svgs/vidis_schield.svg";
import lockIconInverted from "@/assets/svgs/vidis_schield_inverted.svg";
import logoNoText from "@/assets/svgs/LogoNoText.svg";
import logoNoText_inverted from "@/assets/svgs/LogoNoText_inverted.svg";
export default defineComponent({
  name: "entryButton",
  inject: {
    size: {
      default: "L",
    },
  },
  props: {},
  components: { Button },
  data() {
    return {
      logo,
      lockIcon,
      lockIconInverted,
      logoNoText,
      logoNoText_inverted,
      buttonHovered: false,
    };
  },
  computed: {
    icon() {
      if (this.size === "S")
        return this.buttonHovered ? this.logoNoText_inverted : this.logoNoText;
      else return this.buttonHovered ? this.lockIconInverted : this.lockIcon;
    },
  },
  methods: {
    clicked() {
      this.$emit("clicked");
    },
  },
});
</script>
