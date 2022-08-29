<template>
  <div
    style="width: 100%; margin-bottom: 32px"
    class="grid-nogutter flex justify-content-between"
    :class="{ 'align-items-center': !showCrestLogoArea }"
    :style="{
      'padding-right': showCrestLogoArea ? '72px' : '24px',
      'padding-top': showCrestLogoArea ? '' : '35px',
    }"
  >
    <div
      :class="{
        crestLogoArea: showCrestLogoArea,
        simpleLogoArea: !showCrestLogoArea,
      }"
    >
      <div v-if="showCrestLogoArea">
        <img
          style="height: 45px"
          :src="logo"
          :alt="$t('general.branding_accessibility')"
        />
        <p class="initiativeFromLabel">{{ $t("help.initiativeFrom") }}</p>
        <crests :lines="2" />
      </div>
      <img
        v-else
        style="height: 29px"
        :src="logo"
        :alt="$t('general.branding_accessibility')"
      />
    </div>
    <div>
      <Button
        name="help"
        class="p-button-link closeHelpButton"
        v-esc="closeDialog"
        @click="closeDialog"
        :style="{ 'margin-top': showCrestLogoArea ? '1.5rem' : '' }"
      >
        <img style="height: 10px" :src="close" :alt="$t('help.closeAlt')" />
      </Button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import esc from "@/directives/v-esc";
import Button from "primevue/button";
import breakpoints from "@/mixins/breakpoints";
import crests from "@/components/layoutElements/crests.vue";

import logo from "@/assets/svgs/Logo.svg";
import shield from "@/assets/svgs/vidis_schield.svg";
import close from "@/assets/svgs/close.svg";

export default defineComponent({
  name: "vbtnHeader",
  props: {},
  components: { Button, crests },
  mixins: [breakpoints],
  data() {
    return { logo, shield, close };
  },

  computed: {
    showCrestLogoArea(): boolean {
      return this.breakpoint === "xl";
    },
  },
  methods: {
    closeDialog(): void {
      this.$emit("closeDialog");
    },
  },
  directives: {
    esc,
  },
});
</script>
